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
          monospace: true,
          width: "10%",
          onMobile: {
            hidden: true
          }
        }
      },
      {
        realName: "cost",
        shownName: "Стоимость",
        class: "cost",
        style: {
          textAlign: "center",
          monospace: true,
          width: "15%",
          onMobile: {
            width: "35%"
          }
        }
      },
      {
        realName: "name",
        shownName: "Название",
        class: "name",
        style: {
          width: "1fr"
        }
      },
      {
        realName: "time",
        shownName: "Время",
        style: {
          class: "time",
          textAlign: "center",
          monospace: true,
          width: "22%",
          onMobile: {
            width: "30%"
          }
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
    <Table entries={data.solves} {config} />
  {:else}
    <h2 class="disabled">Еще не решено ни одного таска</h2>
  {/if}
</section>

<style>
  section {
    width: 100%;
    max-width: 1024px;
  }
  h2 {
    text-align: center;
  }

  .disabled {
    color: var(--text-inactive);
  }
</style>
