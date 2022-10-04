<script>
  import Task from "$lib/components/Task.svelte";
  export let data;

  let categories = new Set();
  let tasksByCategories = {};

  data.tasks.forEach((task) => {
    const c = task.category;
    categories.add(c);
    tasksByCategories[c] = tasksByCategories[c] || [];
    tasksByCategories[c].push(task);
  });
</script>

{#if categories.length > 0}
  {#each [...categories] as category}
    <section>
      <h1>{category}</h1>
      <div class="task-box">
        {#each tasksByCategories[category] as task}
          <Task {...task} />
        {/each}
      </div>
    </section>
  {/each}
{:else}
    <h1 class="disabled">Тут пока пусто...</h1>
{/if}

<style>
  section {
    width: 100%;
  }
  h1 {
    text-align: left;
  }
  h1.disabled {
    text-align: center;
    color: var(--text-inactive);
  }
  .task-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
