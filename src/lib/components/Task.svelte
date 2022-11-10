<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { faUser, faCoins } from "@fortawesome/free-solid-svg-icons";

  export let id;
  export let name;
  export let cost;
  export let isSolved;
  export let solves;

  export let category;
  export let showCategory;
</script>

<a href="/task/{id}" class="base" class:is-solved={isSolved}>
  <span class="name">{name}</span>

  <div class="cost">
    <span>{cost}</span>
    <Fa icon={faCoins} />
  </div>
  {#if showCategory}
    <div class="category">
      <span>{category}</span>
    </div>
  {/if}
  <div class="solves">
    <span>{solves}</span>
    <Fa icon={faUser} />
  </div>
</a>

<style>
  .base {
    display: block;
    position: relative;
    color: var(--text-color);
    --blocks-per-row: 1;
    width: calc(100% / var(--blocks-per-row) - 1em);
    box-sizing: border-box;
    aspect-ratio: 4 / 3;
    background-color: var(--surface);
    margin: 0.5em;
    padding: 1em;
    border-radius: 1em;
  }
  .base:hover {
    text-decoration: unset;
    background-color: var(--primary);
    color: var(--background);
  }
  .is-solved {
    background-color: var(--task-solved);
    color: var(--primary);
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 0.5em);
    font-size: 1.2em;
    margin: -0.5em 0;
    text-align: center;
    overflow: hidden;
  }

  .cost,
  .category,
  .solves {
    position: absolute;
    font-size: 0.9em;
    bottom: 1em;
  }
  .cost {
    left: 1em;
  }
  .category {
    left: 50%;
    transform: translateX(-50%);
  }
  .solves {
    right: 1em;
  }

  @media (min-width: 540px) {
    .base {
      --blocks-per-row: 2;
    }
  }

  @media (min-width: 540px) {
    .base {
      --blocks-per-row: 3;
    }
  }

  @media (min-width: 1080px) {
    .base {
      --blocks-per-row: 5;
    }
  }

  @media (min-width: 1440px) {
    .base {
      --blocks-per-row: 6;
    }
  }
</style>
