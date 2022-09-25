import { browser } from "$app/environment";
import { writable } from "svelte/store";

function createColorStore(defaultValue) {
  const { subscribe, set } = writable(defaultValue);

  return {
    subscribe: (fn) => {
      return subscribe((value) => {
        if (browser) {
          window.document.body.className = value;
        }
        fn(value);
      });
    },
    readStorage: () => {
      const fromStorage = localStorage.getItem("color-theme");
      if (fromStorage) set(fromStorage);
    },
    set: (value) => {
      if (browser) {
        localStorage.setItem("color-theme", value);
      }
      set(value);
    }
  };
}

export const colorStore = createColorStore("dark");

// At least one subscription is required, so subscribe() function
// will run and update look of page, if theme is changed
colorStore.subscribe(() => {});
