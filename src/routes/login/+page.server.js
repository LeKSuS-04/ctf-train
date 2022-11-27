import { invalid } from "@sveltejs/kit";
import { authentiateUser, getAccessToken } from "$lib/auth";
import { makeApiResponse } from "$lib/auth";

export const actions = {
  // Handle user logging in
  default: async ({ cookies, request }) => {
    // Get data from form
    const data = await request.formData();
    const username = data.get("username").trim();
    const password = data.get("password");

    // If some of fields are missing, return 400
    if ([username, password].some((prop) => !prop)) {
      return invalid(400, { username, missing: true });
    }

    // Try to authenticate user with provided credentials and throw 400, if
    // user with provided credentials doesn't exist
    const user = await authentiateUser(username, password);
    if (user === null) {
      return invalid(400, { username, badCredentials: true });
    }

    // If user exists, set session cookie to user token and return user object
    cookies.set("session", await getAccessToken(user));
    return makeApiResponse(user);
  }
};
