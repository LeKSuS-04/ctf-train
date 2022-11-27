import { userFromToken } from "$lib/auth";
import { prisma } from "$lib/db";
import { serialize } from "cookie";

export const handle = async ({ event, resolve }) => {
  // Fetch settings from db and add them to the locals
  let settings = await prisma.settings.findFirst({
    select: { allowRegistration: true }
  });
  // If for some reason there's no settings object in database yet,
  // create it. This could happen, for example, at the very first request
  if (settings == null) {
    settings = await prisma.settings.create({ data: {} });
  }
  event.locals.settings = settings;

  // Get current user from token in cookies and add it to locals
  const token = event.cookies.get("session");
  if (token === undefined) {
    event.locals.user = null;
  } else {
    event.locals.user = await userFromToken(token);
  }

  const response = await resolve(event);

  // Remove "session" cookie if it is invalid.
  // If a user is signing in, at the moment of request proccessing, session cookie
  // will still be invalid, but it shouldn't be overwritten, so we need to check,
  // if a user is logging in.
  const loggingIn = response.headers.get("Set-Cookie")?.includes("session");
  if (!loggingIn && !event.locals.user) {
    response.headers.set(
      "Set-Cookie",
      serialize("session", "", { expires: new Date(Date.now() - 3600) })
    );
  }

  return response;
};
