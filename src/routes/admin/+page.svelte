<script>
  import { enhance } from "$app/forms";
  export let data;
</script>

<section>
  <p>Регистрация</p>
  <form method="POST" action="?/toggleRegistration" use:enhance>
    <button class:opened={data.allowRegistration}>
      {data.allowRegistration ? "Открыта" : "Закрыта"}
    </button>
  </form>
</section>

<style>
  section {
    padding-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 768px;
    padding-left: 0;
  }

  button {
    padding: 0.6em 0.8em;
    border-radius: 0.4em;
    outline: none;
    border: none;
    background-color: var(--surface);
    color: var(--text);
    transition-duration: 200ms;
  }
  button.opened {
    background-color: var(--primary);
    color: var(--background);
  }
  button:hover {
    background-color: var(--primary-accent);
    cursor: pointer;
  }
</style>
