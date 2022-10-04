<script>
  import Table from "$lib/components/Table.svelte";
  import TextSep from "$lib/components/TextSep.svelte";

  export let data;

  const config = {
    templateLink: "/task/{}",
    fields: [
      {
        realName: "category",
        shownName: "Категория",
        style: {
          textAlign: "center",
          monospace: true
        }
      },
      {
        realName: "cost",
        shownName: "Стоимость",
        class: "cost",
        style: {
          textAlign: "center",
          monospace: true
        }
      },
      {
        realName: "name",
        shownName: "Название",
        class: "name"
      },
      {
        realName: "time",
        shownName: "Время",
        style: {
          class: "time",
          textAlign: "center",
          monospace: true
        }
      }
    ],
    placement: false
  };
</script>

<section>
  <h1>{data.profile.username}</h1>
  <h2>{data.solvedSum} поинтов <TextSep /> {data.solves.length} флагов</h2>

  {#if data.solves.length > 0}
    <Table className="tasks-solved" entries={data.solves} {config} />
  {:else}
    <h2 class="disabled">Еще не решено ни одного таска</h2>
  {/if}
</section>

<style>
  h2 {
    text-align: center;
  }

  .disabled {
    color: var(--text-inactive);
  }

  :global(.tasks-solved td.time) {
    padding: 0 1em;
  }
</style>
