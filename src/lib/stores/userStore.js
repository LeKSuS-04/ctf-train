import { goto } from "$app/navigation";
import { writable } from "svelte/store";

function createUserStore(initValue) {
  const { subscribe, update, set } = writable(initValue);

  return {
    subscribe,
    update,
    set,

    login: async (apiResponse) => {
      set(apiResponse);
      await goto("/");
    },

    logout: async () => {
      set(null);
      const response = await fetch("/logout", { method: "POST" });
      if (response.redirected) {
        await goto(response.url);
      }
    }
  };
}

export const user = createUserStore(null);
