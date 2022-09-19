import { invalid, redirect } from "@sveltejs/kit";
import { createUser, getAccessToken } from "$lib/auth";
import { Prisma } from "@prisma/client";

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    const username = data.get("username");
    const fio = data.get("fio");
    const password = data.get("password");

    if ([fio, username, password].some((prop) => !prop)) {
      return invalid(400, { username, fio, missing: true });
    }

    try {
      const user = await createUser(username, fio, password, false);
      cookies.set("session", await getAccessToken(user));
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        return invalid(409, { username, fio, exists: true });
      } else {
        throw e;
      }
    }

    throw redirect(303, "/");
  }
};
