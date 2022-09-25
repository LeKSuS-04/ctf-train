import { invalid } from "@sveltejs/kit";
import { authentiateUser, getAccessToken } from "$lib/auth";
import { makeApiResponse } from "$lib/auth";

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    const username = data.get("username");
    const password = data.get("password");

    if ([username, password].some((prop) => !prop)) {
      return invalid(400, { username, missing: true });
    }

    const user = await authentiateUser(username, password);
    if (user === null) {
      return invalid(400, { username, badCredentials: true });
    }

    cookies.set("session", await getAccessToken(user));
    return makeApiResponse(user);
  }
};
