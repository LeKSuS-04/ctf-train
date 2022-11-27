import { userFromToken } from "$lib/auth";
import { prisma } from "$lib/db";
import { serialize } from "cookie";

export const handle = async ({ event, resolve }) => {
  let settings = await prisma.settings.findFirst({
    select: { allowRegistration: true }
  });
  if (settings == null) {
    settings = await prisma.settings.create({ data: {} });
  }
  event.locals.settings = settings;

  const token = event.cookies.get("session");
  if (token === undefined) {
    event.locals.user = null;
  } else {
    event.locals.user = await userFromToken(token);
  }

  const response = await resolve(event);
  if (!event.locals.user) {
    response.headers.set("set-cookie", serialize("session", "", { expires: new Date(Date.now() - 3600) }));
  }

  return response;
};
