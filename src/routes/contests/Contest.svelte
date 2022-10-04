<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { faFlag, faCoins } from "@fortawesome/free-solid-svg-icons";

  export let id;
  export let name = "Task name";
  export let description = "Task description";
  export let solved = [];
  export let unsolved = [];

  let solvedCost = 0;
  let unsolvedCost = 0;

  solved.forEach(({ cost }) => (solvedCost += cost));
  unsolved.forEach(({ cost }) => (unsolvedCost += cost));
</script>

<a class="contest" href="/contest/{id}">
  <div class="details">
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
  <div class="stats">
    <span>{solved.length}/{solved.length + unsolved.length} <Fa icon={faFlag} /></span>
    <span>{solvedCost}/{solvedCost + unsolvedCost} <Fa icon={faCoins} /></span>
  </div>
</a>

<style>
  a.contest {
    position: relative;
    margin: 1em;
    width: calc(100% - 2em);
    max-width: 1024px;
    background: var(--surface);
    border-radius: 1em;
    padding: 1em;
    color: unset;
    text-decoration: unset;
  }
  a:hover {
    background-color: var(--primary);
  }
  a:hover h2,
  a:hover p,
  a:hover .stats {
    color: var(--background);
  }
  h2 {
    color: var(--text-accent);
  }

  .stats {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1em;
    top: 1em;
    right: 1em;
    font-size: 0.9em;
    font-family: var(--font-mono);
  }

  @media (min-width: 1024px) {
    a.contest {
      min-width: 1024px;
    }
  }
</style>
