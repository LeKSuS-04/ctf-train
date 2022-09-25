<script>
  import { user } from "$lib/stores/userStore";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../app.css";
  import "../color-themes.css";
  
  export let data;
  user.set(data.user);

  // import { colorStore } from "$lib/stores/colorThemeStore";
  // import { onMount } from "svelte";
  // onMount(() => {
  //   colorStore.readStorage();
  // });
</script>

<Header />

<main>
  <slot />
</main>

<Footer />

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 1em;
    width: 100%;
    max-width: 1440px;
    min-height: calc(100vh - 10rem);
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (min-width: 720px) {
    main {
      min-height: calc(100vh - 8rem);
    }
  }
</style>
