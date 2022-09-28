import { invalid } from "@sveltejs/kit";
import { createUser, getAccessToken, makeApiResponse } from "$lib/auth";
import { Prisma } from "@prisma/client";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const data = await request.formData();

    const username = data.get("username");
    const fio = data.get("fio");
    const password = data.get("password");

    if (!locals.settings.allowRegistration) {
      return invalid(403, { username, fio, disallowed: true });
    }

    if ([fio, username, password].some((prop) => !prop)) {
      return invalid(400, { username, fio, missing: true });
    }

    try {
      const user = await createUser(username, fio, password, false);
      cookies.set("session", await getAccessToken(user));
      return makeApiResponse(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return invalid(409, { username, fio, exists: true });
      } else {
        throw e;
      }
    }
  }
};
