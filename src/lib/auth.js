import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "$lib/db";
import { error } from "@sveltejs/kit";

const secretKey = process.env.SECRET_KEY ?? "No secrets?";
const bcryptRounds = 10;

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

export function getAccessToken(user) {
  const data = { uid: user.id };
  return jwt.sign(data, secretKey);
}

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

export function makeApiResponse(user) {
  return {
    username: user.username,
    fio: user.fio,
    isAdmin: user.isAdmin
  };
}

export function authGuard(locals) {
  const user = locals.user;
  if (user === null) throw error(401);
}

export function adminGuard(locals) {
  const user = locals.user;
  if (user === null || !user.isAdmin) throw error(401);
}
