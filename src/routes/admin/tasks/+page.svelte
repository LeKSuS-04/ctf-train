<script>
  import { enhance } from "$app/forms";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
  import Table from "$lib/components/Table.svelte";

  export let data;
  console.log(data);

  const config = {
    templateLink: "/admin/edit-task/{}",
    fields: [
      {
        realName: "name",
        shownName: "Название",
        style: {
          class: "name",
          width: "20%",
          hideOverflow: true
        }
      },
      {
        realName: "category",
        shownName: "Категория",
        style: {
          width: "5%",
          textAlign: "center",
          monospace: true
        }
      },
      {
        realName: "cost",
        shownName: "Стоимость",
        style: {
          width: "5%",
          textAlign: "center",
          monospace: true
        }
      },
      {
        realName: "description",
        shownName: "Описание",
        style: {
          width: "70%",
          textAlign: "center",
          hideOverflow: true
        }
      }
    ]
  };
</script>

<section>
  <section class="searchbar">
    <form action="?/create" method="POST" use:enhance>
      <button><Fa icon={faPlus} /></button>
    </form>
    <input id="search" type="text" placeholder="Search..." />
    <button><Fa icon={faMagnifyingGlass} /></button>
  </section>

  <Table className="admin-task-list" entries={data.tasks} {config} />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .searchbar {
    width: 100%;
    max-width: 768px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 1em;
  }
  .searchbar #search {
    width: 100%;
    padding: 0.4em 0.6em;
    outline: none;
    border: 2px var(--surface) solid;
    border-radius: 0.4em;
    font-size: 1.3em;
    background-color: var(--surface);
    color: var(--text);
  }
  section #search:focus {
    border-color: var(--primary);
  }
  section #search::placeholder {
    color: var(--text-inactive);
  }
  .searchbar form,
  .searchbar button {
    margin-top: 0;
    width: 3.5em;
  }
  .searchbar button {
    border-radius: 0.4em;
    background-color: var(--primary);
    color: var(--background);
    border: none;
    outline: none;
    transition-duration: 200ms;
  }
  .searchbar button:hover {
    background-color: var(--primary-accent);
    cursor: pointer;
  }
  :global(.admin-task-list .name) {
    padding-left: 1em;
  }
</style>
