<script>
  import Fuse from "fuse.js";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

  export let data;
  export let keys;

  const dispatch = createEventDispatcher();

  let searchQuery = "";
  const fuse = new Fuse(data, {
    keys
  });

  function search() {
    dispatch("searchComplete", {
      data: searchQuery ? fuse.search(searchQuery).map(({ item }) => item) : data
    });
  }
</script>

<section class="searchbar">
  <input
    id="search"
    type="search"
    placeholder="Search..."
    autocomplete="off"
    bind:value={searchQuery}
    on:search={search}
  />
  <button on:click={search}><Fa icon={faMagnifyingGlass} /></button>
</section>

<style>
  .searchbar {
    width: 100%;
    max-width: 768px;
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 1em;
  }
  .searchbar #search {
    width: 100%;
    padding: 0.4em 0.6em;
    outline: none;
    border: 2px var(--surface) solid;
    border-radius: 0.4em;
    font-size: 1.3em;
    background-color: var(--surface);
    color: var(--text);
  }
  section #search:focus {
    border-color: var(--primary);
  }
  section #search::placeholder {
    color: var(--text-inactive);
  }
  .searchbar button {
    margin-top: 0;
    width: 3.5em;
  }
  .searchbar button {
    border-radius: 0.4em;
    background-color: var(--primary);
    color: var(--background);
    border: none;
    outline: none;
    transition-duration: 200ms;
  }
  .searchbar button:hover {
    background-color: var(--primary-accent);
    cursor: pointer;
  }
</style>
