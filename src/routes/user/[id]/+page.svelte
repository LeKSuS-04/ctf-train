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
        class: "category"
      },
      {
        realName: "cost",
        shownName: "Стоимость",
        class: "cost"
      },
      {
        realName: "name",
        shownName: "Название",
        class: "name"
      },
      {
        realName: "time",
        shownName: "Время",
        class: "time"
      }
    ],
    icons: {}
  };
</script>

<section>
  <h1>{data.profile.username}</h1>
  <h2>{data.solvedSum} поинтов <TextSep /> {data.solves.length} флагов</h2>
  <Table className="tasks-solved" entries={data.solves} {config} />
</section>

<style>
  h2 {
    text-align: center;
  }

  :global(.tasks-solved td.time),
  :global(.tasks-solved td.cost),
  :global(.tasks-solved td.category) {
    font-family: var(--font-mono);
    text-align: center;
  }

  :global(.tasks-solved th.time),
  :global(.tasks-solved th.cost),
  :global(.tasks-solved th.category) {
    text-align: center;
  }

  :global(.tasks-solved td.time) {
    padding: 0 1em;
  }
</style>
