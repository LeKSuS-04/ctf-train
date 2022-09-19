<script>
  export let category;
  export let cost;
  export let description;
  export let title;

  function goBack() {
    history.back();
  }
</script>

<section class="task-info">
  <h1>{title}</h1>
  <h2 class="category-cost">
    {category} / <span class="cost">{cost}</span>
  </h2>
  <p class="description">{@html description}</p>

  <form>
    <input type="text" placeholder="flag&#123;Ucucucuga&#125;" />
    <button type="submit">Сдать</button>
  </form>

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
  }

  .go-back {
    display: block;
    margin-top: 1em;
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
