<script>
  import { enhance } from "$app/forms";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import Table from "$lib/components/Table.svelte";
  import SearchBar from "$lib/components/SearchBar.svelte";

  export let data;

  let searchKeys = ["name", "description"];
  let filteredContests = data.contests;
  function handleSearch(event) {
    filteredContests = event.detail.data;
  }

  const config = {
    templateLink: "/admin/edit-contest/{}",
    fields: [
      {
        realName: "name",
        shownName: "Название",
        style: {
          width: "40%"
        }
      },
      {
        realName: "description",
        shownName: "Описание",
        style: {
          width: "60%",
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
    <SearchBar data={data.contests} keys={searchKeys} on:searchComplete={handleSearch} />
  </section>

  <Table className="admin-task-list" entries={filteredContests} {config} />
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
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 1em;
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
