import { invalid } from "@sveltejs/kit";
import { createUser, getAccessToken, makeApiResponse } from "$lib/auth";
import { Prisma } from "@prisma/client";

export const actions = {
  // Handle user registration
  default: async ({ cookies, request, locals }) => {
    // Get data from form
    const data = await request.formData();
    const username = data.get("username").trim();
    const fio = data.get("fio").trim();
    const password = data.get("password");

    // If registration is not allowed in settings, return 403
    if (!locals.settings.allowRegistration) {
      return invalid(403, { username, fio, disallowed: true });
    }

    // If some of fields are missing, return 400
    if ([fio, username, password].some((prop) => !prop)) {
      return invalid(400, { username, fio, missing: true });
    }

    try {
      // Create user, set session cookie to user token and return user object
      const user = await createUser(username, fio, password, false);
      cookies.set("session", await getAccessToken(user));
      return makeApiResponse(user);
    } catch (e) {
      // If user already exists, return 409
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return invalid(409, { username, fio, exists: true });
      } else {
        throw e;
      }
    }
  }
};
