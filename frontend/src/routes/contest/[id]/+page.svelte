<script>
  import Task from '$lib/Task.svelte';
  export let data;
  
  let categories = new Set();
  let tasksByCategories = {};

  data.tasks.forEach(task => {
    const c = task.category;
    categories.add(c);
    tasksByCategories[c] = tasksByCategories[c] || [];
    tasksByCategories[c].push(task);
  }); 
</script>

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

<style>
  section {
    width: 100%;
  }
  h1 {
    text-align: left;
  }
  .task-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>