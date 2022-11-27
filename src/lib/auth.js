import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "$lib/db";
import { error } from "@sveltejs/kit";

const secretKey = process.env.SECRET_KEY ?? "No secrets?";
const bcryptRounds = 10;

/**
 * Creates new user from provided values
 * @param {String} username - Iser's username
 * @param {String} fio - User's fio
 * @param {String} password - User's password
 * @param {Boolean} [isAdmin=false] - Is this user admin? Defaults to false
 * @returns User object from database
 */
export async function createUser(username, fio, password, isAdmin = false) {
  const passwordHash = await bcrypt.hash(password, bcryptRounds);
  const user = await prisma.user.create({
    data: {
      username,
      fio,
      passwordHash,
      isAdmin
    }
  });
  return user;
}

/**
 * Authenticates user with provided username and password
 * @param {String} username - User's username
 * @param {String} password - Users' password
 * @returns User object if user with provided credentials is found, or null
 */
export async function authentiateUser(username, password) {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  if (user === null) return null;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  return passwordMatches ? user : null;
}

/**
 * @param {User} user
 * @returns Access token for provided user
 */
export function getAccessToken(user) {
  const data = { uid: user.id };
  return jwt.sign(data, secretKey);
}

/**
 * Authenticates user by the token. If token is invalid, expired or user
 * is inactive, returns null
 * @param {String} token
 * @returns User or null
 */
export async function userFromToken(token) {
  try {
    const options = {
      maxAge: "90d"
    };
    const data = jwt.verify(token, secretKey, options);
    const user = await prisma.user.findUnique({
      where: {
        id: data.uid
      }
    });

    if (user === undefined || !user.isActive) {
      return null;
    }

    return makeApiResponse(user);
  } catch (e) {
    const expectedErrors = [jwt.TokenExpiredError, jwt.JsonWebTokenError];

    if (expectedErrors.some((errClass) => e instanceof errClass)) {
      return null;
    }
    throw e;
  }
}

/**
 * Strips from user properties, that aren't needed for rendering components
 * @param {User} user
 * @returns Stripped user object
 */
export function makeApiResponse(user) {
  return {
    id: user.id,
    username: user.username,
    fio: user.fio,
    isAdmin: user.isAdmin
  };
}

/**
 * Ensures that user is authenticated, throws 401 otherwise
 * @param {Object} locals
 */
export function authGuard(locals) {
  const user = locals.user;
  if (user === null) throw error(401);
}

/**
 * Ensures that user is authenticated and is administrator, throws 401 otherwise
 * @param {Object} locals
 */
export function adminGuard(locals) {
  const user = locals.user;
  if (user === null || !user.isAdmin) throw error(401);
}
