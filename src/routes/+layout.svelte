<script>
  import { user } from "$lib/userStore";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import "../app.css";

  export let data;
  user.set(data.user);
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
