<script>
  import Contest from "./Contest.svelte";
  export let data;
</script>

{#if data.contests.length > 0}
  {#each data.contests as contest}
    <Contest {...contest} />
  {/each}
{:else}
  <h1 class="disabled">Контестов пока нет</h1>
{/if}

<style>
  .disabled {
    color: var(--text-inactive);
  }
</style>