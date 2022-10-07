<script>
  import Task from "$lib/components/Task.svelte";
  export let data;
</script>

<section>
  <div class="task-box">
    {#each data.tasks as task}
      <Task {...task} />
    {/each}    
  </div>
</section>

<style>
  .task-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>