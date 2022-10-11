<script>
  import Task from "$lib/components/Task.svelte";
  import SearchBar from "$lib/components/SearchBar.svelte";
  export let data;

  let filteredTasks = data.tasks;
  let searchKeys = ["name", "category", "description", "cost"];
  let showSolved;

  function filterBasedOnPrefs() {
    filteredTasks = data.tasks.filter(({ isSolved }) => isSolved <= showSolved);
  }

  function handleSearch(event) {
    filteredTasks = event.detail.data;
  }
</script>

<section>
  <section class="searchbar">
    <select
      name="show-solved"
      id="show-solved"
      bind:value={showSolved}
      on:change={filterBasedOnPrefs}
    >
      <option value="1" selected>Показать все</option>
      <option value="0">Спрятать решенные</option>
    </select>
    <SearchBar data={data.tasks} keys={searchKeys} on:searchComplete={handleSearch} />
  </section>
  <div class="task-box">
    {#each filteredTasks as task}
      <Task {...task} />
    {/each}
  </div>
</section>

<style>
  .searchbar {
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
  select {
    padding: 0.4em 0.8em;
    margin: 0 1em 0.5em 1em;
    outline: none;
    border-radius: 0.4em;
    font-size: 1rem;
    color: var(--text);
    border: 2px solid var(--surface);
    background-color: var(--background);
  }
  option {
    font-size: 0.8rem;
  }
  .task-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
