import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { prisma } from "$lib/db";

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
    const user = prisma.user.findUnique({
      where: {
        id: data.uid
      }
    });
    return user;
  } catch (e) {
    const expectedErrors = [jwt.TokenExpiredError, jwt.JsonWebTokenError];

    if (expectedErrors.some((errClass) => e instanceof errClass)) {
      return null;
    }
    throw e;
  }
}
