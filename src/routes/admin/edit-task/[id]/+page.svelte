<script>
  import { enhance, applyAction } from "$app/forms";
  import FormError from "$lib/components/FormError.svelte";
  export let data;

  let editing = true;

  let changedAnything = false;
  function userInput() {
    changedAnything = true;
  }

  function saveTask() {
    changedAnything = false;
    applyAction();
  }

  function goBack() {
    history.back();
  }
</script>

<section class="main">
  {#if editing}
    <form id="task-form" action="?/save" method="POST" use:enhance={saveTask}>
      <input
        name="name"
        id="name"
        type="text"
        placeholder="Task name"
        autocomplete="off"
        bind:value={data.task.name}
        on:input={userInput}
      />
      <section class="category-cost">
        <input
          name="category"
          id="category"
          type="text"
          placeholder="Misc"
          autocomplete="off"
          bind:value={data.task.category}
          on:input={userInput}
        />
        /
        <input
          name="cost"
          id="cost"
          type="number"
          placeholder="0"
          autocomplete="off"
          bind:value={data.task.cost}
          on:input={userInput}
        />
      </section>
      <textarea
        name="description"
        id="description"
        type="text"
        placeholder="Task description"
        rows="10"
        bind:value={data.task.description}
        on:input={userInput}
      />
      <input
        name="flag"
        id="flag"
        type="text"
        placeholder="flag&#123;...&#125;"
        autocomplete="off"
        bind:value={data.task.flag}
        on:input={userInput}
      />
    </form>
  {:else}
    <h1>{data.task.name}</h1>
    <h2 class="category-cost">
      {data.task.category} / <span class="cost">{data.task.cost}</span>
    </h2>
    <p class="description">{@html data.task.description}</p>
  {/if}

  <section class="action-buttons">
    <button on:click={() => (editing = !editing)}>
      {userInput ? "Посмотреть" : "Изменить"}
    </button>
    <form>
      <button form="task-form">Сохранить</button>
      {#if changedAnything}
        <div class="form-error-padding" />
        <FormError>Изменения не сохранены</FormError>
      {/if}
    </form>
    <form action="?/toggleActivate" method="POST" use:enhance>
      <button class:active={data.task.isActive}>
        {data.task.isActive ? "Активен" : "Спрятан"}
      </button>
    </form>
    <form action="?/delete" method="POST" use:enhance>
      <button class="delete">Удалить</button>
    </form>
  </section>

  <!-- svelte-ignore a11y-missing-attribute -->
  <span class="go-back"><a on:click|preventDefault={goBack}>Вернуться обратно</a></span>
</section>

<style>
  section.main {
    width: 480px;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0;
  }
  .category-cost {
    margin: 0;
    line-height: 2;
    text-align: center;
  }
  .category-cost .cost {
    font-family: var(--font-mono);
  }

  .description {
    font-size: 1.2em;
    text-align: center;
    margin: 2em 0;
  }

  input#name {
    font-size: 2.2rem;
    margin: 0.4em 0;
    width: calc(100% - 0.6em);
    text-align: center;
  }

  input#category,
  input#cost {
    display: inline;
    width: auto;
  }
  input#category {
    text-align: right;
  }
  input#cost {
    text-align: left;
    font-family: var(--font-mono);
  }

  .form-error-padding {
    height: 0.5em;
  }

  .action-buttons {
    width: 100%;
    padding-bottom: 1em;
  }
  .action-buttons button {
    width: 100%;
    margin: 0;
    margin-top: 1em;
    padding: 0;
    background-color: var(--surface);
    color: var(--text);
    outline: none;
    border: none;
    border-radius: 0.4em;
    padding: 0.8em 0.6em;
  }
  .action-buttons button.active {
    color: var(--background);
    background-color: var(--primary);
  }
  .action-buttons button:hover {
    transition-duration: 200ms;
    color: var(--background);
    background-color: var(--primary);
    cursor: pointer;
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
</style>
