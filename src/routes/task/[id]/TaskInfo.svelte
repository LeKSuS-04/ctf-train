<script>
  import { enhance, applyAction } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import FormError from "$lib/FormError.svelte";

  export let form;
  let submitionError = false;

  export let category;
  export let cost;
  export let description;
  export let name;
  export let isSolved;

  function goBack() {
    history.back();
  }

  function handleSubmition() {
    return async ({ result }) => {
      await applyAction(result);
      if (result.type === "invalid") {
        submitionError = true;
      }
      if (result.type === "success") {
        invalidateAll();
      }
    };
  }
</script>

<section class="task-info">
  <h1 class:solved={isSolved}>{name}</h1>
  <h2 class="category-cost">
    {category} / <span class="cost">{cost}</span>
  </h2>
  <p class="description">{@html description}</p>

  {#if isSolved}
    <div class="solved-container">
      <div>Таск решен</div>
    </div>
  {:else}
    <form method="POST" use:enhance={handleSubmition}>
      <input
        type="text"
        name="flag"
        class:wrong={submitionError}
        placeholder="flag&#123;Ucucucuga&#125;"
        autocomplete="off"
        value={form ? form["flag"] ?? "" : ""}
        on:input={() => (submitionError = false)}
      />

      {#if submitionError}
        <span class="error">
          {#if form.badFlag}
            <FormError>Неверный флаг</FormError>
          {:else if form.alreadySolved}
            <FormError>Таск уже решен</FormError>
          {/if}
        </span>
      {/if}

      <button type="submit">Сдать</button>
    </form>
  {/if}

  <!-- svelte-ignore a11y-missing-attribute -->
  <span class="go-back"><a on:click|preventDefault={goBack}>Вернуться обратно</a></span>
</section>

<style>
  .task-info {
    width: 300px;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0;
  }
  h1.solved {
    color: var(--primary);
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

  form {
    width: 100%;
  }
  form button {
    margin-top: unset;
    margin-bottom: 0.5em;
  }
  form input.wrong {
    border-color: var(--text-error);
  }

  .error {
    display: block;
    margin: -0.5em 0 1em 0;
  }

  .solved-container {
    width: 100%;
    text-align: center;
    margin-top: -1em;
    margin-bottom: 2em;
  }
  .solved-container div {
    padding: 1em 4em;
    border-radius: 0.4em;
    background-color: var(--surface);
    color: var(--text);
    outline: none;
    border: none;
  }

  .go-back {
    display: block;
    margin-top: 0.5em;
    text-align: center;
  }
  .go-back a:hover {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .task-info {
      width: 480px;
    }
    h1 {
      font-size: 3rem;
    }
  }
</style>
