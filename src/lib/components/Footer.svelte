<script>
  import { PUBLIC_REPORT_URL } from "$env/static/public";
</script>

<footer>
  <p>Проблемы? <a href={PUBLIC_REPORT_URL}>Пиши сюда!</a></p>
</footer>

<style>
  footer {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 3rem;
    height: 4rem;
    background-color: var(--background-accent);
  }

  footer a {
    font-weight: bold;
  }
</style>
