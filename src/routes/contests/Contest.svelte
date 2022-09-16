<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faFlag, faCoins } from '@fortawesome/free-solid-svg-icons';

  export let id;
  export let name = 'Task name';
  export let description = 'Task description';
  export let tasksSolved = 0;
  export let totalTasks = 10;
  export let pointsObtained = 0;
  export let totalPoints = 2000;
</script>

<a class="contest" href="/contest/{id}">
  <div class="details">
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
  <div class="stats">
    <span>{tasksSolved}/{totalTasks} <Fa icon={faFlag} /></span>
    <span>{pointsObtained}/{totalPoints} <Fa icon={faCoins} /></span>
  </div>
</a>

<style>
  a.contest {
    position: relative;
    margin: 1em;
    width: calc(100% - 4em);
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