<script>
  import Contest from "./Contest.svelte";
  export let data;
</script>

{#each data.contests as contest}
  <Contest {...contest} />
{/each}
