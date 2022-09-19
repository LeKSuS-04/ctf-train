import { userFromToken } from "$lib/auth";

export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session");
  if (token === undefined) {
    event.locals.user = null;
  } else {
    event.locals.user = await userFromToken(token);
  }

  const response = await resolve(event);
  if (!event.locals.user) {
    event.cookies.delete("session");
  }

  return response;
};
