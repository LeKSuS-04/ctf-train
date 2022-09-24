<script>
  import { page } from "$app/stores";
  import { PUBLIC_REPORT_URL } from "$env/static/public";

  function goBack() {
    history.back();
  }
</script>

{#if $page.status == 404}
  <h1>Страница не найдена</h1>
  <p>Так не должно быть? Ну напиши <a href={PUBLIC_REPORT_URL}>сюда</a></p>
{:else if $page.status == 401}
  <h1>Нет доступа</h1>
  <p>Такие дела :(</p>
  <p>
    <a href="/">Домой</a> <span class="sep" />
    <a href="/login">Авторизация</a> <span class="sep" />
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click|preventDefault={goBack}>Назад</a>
  </p>
{:else}
  <h1>{$page.status}</h1>
  <p>{$page.error.message}</p>
{/if}

<style>
  .sep::before {
    content: "•";
    margin: auto 0.4em;
  }
</style>
