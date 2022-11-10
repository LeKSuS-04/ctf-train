<script>
  import { enhance, applyAction } from "$app/forms";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faFlag, faCoins, faXmark } from "@fortawesome/free-solid-svg-icons";
  import FormError from "$lib/components/FormError.svelte";
  import Table from "$lib/components/Table.svelte";
  import SearchBar from "$lib/components/SearchBar.svelte";

  export let data;

  $: taskSumCost = data.contest.tasks.reduce((x, y) => x + y.cost, 0);

  let editing = true;
  let changedAnything = false;
  function userInput() {
    changedAnything = true;
  }

  function goBack() {
    history.back();
  }

  function saveContest() {
    changedAnything = false;
    applyAction();
  }

  const searchKeys = ["id", "name", "category", "description", "cost", "flag"];
  let selectedTaskId = null;
  let filteredTasks = data.tasks;
  function handleSearch(event) {
    selectedTaskId = null;
    filteredTasks = event.detail.data;
  }

  function getTaskClickEvent(taskId) {
    return () => (selectedTaskId = taskId);
  }

  function addTask() {
    selectedTaskId = null;
    applyAction();
  }

  const taskTableConfig = {
    templateLink: "/admin/edit-task/{}",
    fields: [
      {
        realName: "name",
        shownName: "Название",
        style: {
          class: "name",
          width: "50%",
          hideOverflow: true
        }
      },
      {
        realName: "category",
        shownName: "Категория",
        style: {
          monospace: true,
          textAlign: "center",
          width: "20%",
        }
      },
      {
        realName: "cost",
        shownName: "Стоимость",
        style: {
          monospace: true,
          textAlign: "center",
          width: "calc(30% - var(--action-width))",
        }
      }
    ],
    actions: [
      {
        link: `/admin/edit-contest/${data.contest.id}?/removeTask`,
        icon: faXmark,
        fadeColor: "var(--text-error)"
      }
    ]
  };
</script>

<section class="contest-edit">
  <section class="contest">
    <form id="contest-form" action="?/save" method="POST" use:enhance={saveContest}>
      <section style:display={editing ? "unset" : "none"}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Contest name"
          autocomplete="off"
          bind:value={data.contest.name}
          on:input={userInput}
        />

        <input
          id="description"
          name="description"
          type="text"
          placeholder="Contest description"
          autocomplete="off"
          bind:value={data.contest.description}
          on:input={userInput}
        />
      </section>

      <section style:display={editing ? "none" : "unset"}>
        <h2>{data.contest.name}</h2>
        <p>{data.contest.description}</p>
      </section>
    </form>

    <section class="stats">
      <span>{data.contest.tasks.length} <Fa icon={faFlag} /></span>
      <span> {taskSumCost} <Fa icon={faCoins} /></span>
    </section>
  </section>

  <section class="action-buttons">
    <button on:click={() => (editing = !editing)}>{editing ? "Показать" : "Изменить"}</button>
    <form>
      <button form="contest-form">Сохранить</button>
      {#if changedAnything}
        <div class="form-error-padding" />
        <FormError>Изменения не сохранены</FormError>
      {/if}
    </form>
    <div class="two-btn-container">
      <form action="?/toggleActivate" method="POST" use:enhance>
        <button class:active={data.contest.isActive}>
          {data.contest.isActive ? "Активен" : "Спрятан"}
        </button>
      </form>
      <form action="?/toggleActivateWithTasks" method="POST" use:enhance>
        <button>
          {data.contest.isActive ? "Спрятать вместе с тасками" : "Активировать вместе с тасками"}
        </button>
      </form>
    </div>
    <div class="two-btn-container">
      <form action="?/delete" method="POST" use:enhance>
        <button class="delete">Удалить</button>
      </form>
      <form action="?/deleteWithTasks" method="POST" use:enhance>
        <button class="delete">Удалить вместе с тасками</button>
      </form>
    </div>
  </section>

  <!-- svelte-ignore a11y-missing-attribute -->
  <span class="go-back"><a on:click|preventDefault={goBack}>Вернуться обратно</a></span>

  <section class="contest-tasks">
    <section>
      <h2>Таски в контесте</h2>
      <Table className="contest-task-list" entries={data.contest.tasks} config={taskTableConfig} />
    </section>
    <section class="add-task">
      <h2>Добавить таск</h2>
      <SearchBar data={data.tasks} keys={searchKeys} on:searchComplete={handleSearch} />

      <div class="tasks">
        {#each filteredTasks as task}
          <div
            class={`task-info ${task.id == selectedTaskId ? "selected" : ""}`}
            on:click={getTaskClickEvent(task.id)}
          >
            <span class="name">{task.name}</span>
            <span class="category-cost">
              <span class="category">{task.category}</span> /
              <span class="cost">{task.cost}</span>
            </span>
          </div>
        {/each}
        {#if filteredTasks.length === 0}
          <p class="nothing-found">Таски не найдены</p>
        {/if}
      </div>

      <form action="?/addTask" method="POST" use:enhance={addTask}>
        <input name="id" id="id" value={selectedTaskId} hidden />
        <button disabled={selectedTaskId === null}>Добавить</button>
      </form>
    </section>
  </section>
</section>

<style>
  .contest-edit {
    width: 100%;
  }

  .contest {
    position: relative;
    margin: 1em;
    width: calc(100% - 2em);
    margin: auto;
    max-width: calc(1024px - 2em);
    background: var(--surface);
    border-radius: 1em;
    padding: 1em;
    color: unset;
    text-decoration: unset;
  }
  .contest h2 {
    padding-top: 0;
    text-align: left;
    color: var(--text-accent);
  }
  .stats {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1em;
    top: 1em;
    right: 1em;
    font-size: 0.9em;
    font-family: var(--font-mono);
  }

  input#name {
    width: 50%;
    font-size: 1.5rem;
  }
  input#name,
  input#description {
    background-color: var(--background-accent);
  }
  input#description {
    margin-bottom: 0;
  }

  .form-error-padding {
    height: 0.5em;
  }

  .action-buttons {
    max-width: 1024px;
    margin: auto;
  }

  .two-btn-container {
    width: 100%;
    display: flex;
    gap: 1em;
  }

  .action-buttons {
    padding-bottom: 1em;
  }
  .action-buttons button.active {
    color: var(--background);
    background-color: var(--primary);
  }
  .action-buttons button.active:hover {
    background-color: var(--primary-accent);
  }
  .action-buttons button.delete:hover {
    background-color: var(--text-error);
  }

  .go-back {
    display: block;
    margin-top: 0.5em;
    text-align: center;
  }
  .go-back a:hover {
    cursor: pointer;
  }

  h2 {
    padding-top: 1em;
    text-align: center;
  }
  .contest-tasks {
    width: 100%;
    max-width: 1024px;
    margin: auto;
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 2em;
  }

  .tasks {
    max-height: 320px;
    overflow-y: auto;
  }
  .tasks::-webkit-scrollbar,
  .tasks::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .tasks::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 0.4em;
  }
  .add-task .task-info {
    background-color: var(--surface);
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    padding: 0.8em 0.6em;
    border-radius: 0.4em;
    transition-duration: 200ms;
  }
  .add-task .task-info:hover,
  .add-task .task-info.selected {
    background-color: var(--primary);
    color: var(--background);
    cursor: pointer;
  }
  .add-task .task-info.selected:hover {
    background-color: var(--primary-accent);
    cursor: pointer;
  }
  .add-task .task-info .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .add-task .task-info .category-cost {
    width: 7em;
    text-align: end;
  }
  .add-task .task-info .cost {
    font-family: var(--font-mono);
  }
  .add-task p.nothing-found {
    text-align: center;
  }
  .add-task p.nothing-found {
    color: var(--text-inactive);
  }
  .add-task button {
    margin-top: 0;
  }
</style>
