import { goto } from "$app/navigation";
import { writable } from "svelte/store";

/**
 * Creates new user store for client side
 * @param {User|null} initValue 
 * @returns User store
 */
function createUserStore(initValue) {
  const { subscribe, update, set } = writable(initValue);

  return {
    subscribe,
    update,
    set,

    login: async (apiResponse) => {
      // Set user value to response from api and redirect to app root
      set(apiResponse);
      await goto("/");
    },

    logout: async () => {
      // Set store value to null
      set(null);

      // Make request to logout route to remove session
      // POST method ensures that CSRF is not possible
      const response = await fetch("/logout", { method: "POST" });
      if (response.redirected) {
        await goto(response.url);
      }
    }
  };
}

/**
 * user store, used on client side to render pages
 */
export const user = createUserStore(null);
