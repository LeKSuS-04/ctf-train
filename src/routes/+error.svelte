<script>
  import { page } from "$app/stores";
  import { PUBLIC_REPORT_URL } from "$env/static/public";
</script>

{#if $page.status == 404}
  <h1>Страница не найдена</h1>
  <p>Так не должно быть? Ну напиши <a href={PUBLIC_REPORT_URL}>сюда</a></p>
{:else}
  <h1>{$page.status}</h1>
  <p>{$page.error.message}</p>
{/if}
