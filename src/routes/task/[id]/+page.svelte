<script>
  import TaskInfo from "./TaskInfo.svelte";
  import TaskSolves from "./TaskSolves.svelte";

  export let data;
  let activeTab = 0;

  function switchTab(value) {
    return () => (activeTab = value);
  }
</script>

<section class="task-view">
  <nav>
    <ul>
      <li class={activeTab == 0 ? "active" : "inactive"} on:click={switchTab(0)}>Описание таска</li>
      <li class={activeTab == 1 ? "active" : "inactive"} on:click={switchTab(1)}>
        Список решивших
      </li>
    </ul>
  </nav>

  {#if activeTab == 0}
    <TaskInfo {...data.task} />
  {:else}
    <TaskSolves usersSolved={data.usersSolved} />
  {/if}
</section>

<style>
  .task-view {
    height: 100%;
    margin-top: 2rem;
    margin-bottom: auto;
  }

  nav ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    --gap: 2px;
    gap: var(--gap);
    width: calc(300px - var(--gap));
    background-color: var(--surface);
    margin: 0 auto;
    margin-bottom: -1em;
    padding: 0;
    list-style: none;
  }
  nav ul li {
    padding: 1em 0;
    background-color: var(--background);
    text-align: center;
  }
  nav ul li.active {
    color: var(--primary);
  }
  nav ul li:hover {
    color: var(--primary-accent);
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    nav ul {
      width: calc(480px - var(--gap));
    }
  }
</style>
