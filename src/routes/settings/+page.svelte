<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => goto("/"));
</script>

<!-- <script>
  import { colorStore } from "$lib/stores/colorThemeStore";

  const themes = [
    {
      code: "light",
      shownName: "Светлая"
    },
    {
      code: "dark",
      shownName: "Темная"
    },
    {
      code: "mshp-ctf",
      shownName: "MSHP-CTF"
    },
    {
      code: "hackthebox",
      shownName: "Hack the Box"
    }
  ];

  function switchTheme(event) {
    if (event.target.checked) {
      const newTheme = event.target.value;
      colorStore.set(newTheme);
    }
  }
</script>

<ul>
  <li class="color-scheme">
    <p>Цветовая схема</p>
    <form>
      {#each themes as { code, shownName, checked }}
        <section>
          <label for={code}>{shownName}</label>
          <input id={code} value={code} {checked} name="color-theme" type="radio" on:click={switchTheme} />
        </section>
      {/each}
    </form>
  </li>
</ul>

<style>
  ul {
    width: 768px;
    list-style: none;
    display: flex;
  }
  li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .color-scheme form {
    width: 100px;
  }
  .color-scheme section {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style> -->
