<script>
  import { user } from "$lib/stores/userStore";
</script>

<header>
  <nav>
    <ul class="pages">
      <li><a href="/">Главная</a></li>
      {#if $user}
        <li><a href="/contests">Контесты</a></li>
      {/if}
      <li><a href="/score">Скорборд</a></li>
      <li><a href="/groups">Группы</a></li>

      {#if $user && $user.isAdmin}
        <li><a href="/admin">Админ</a></li>
      {/if}
    </ul>

    <ul class="user-actions">
      {#if $user}
        <li><span class="username">{$user.username}</span></li>
        <!-- <li><a href="/settings">Настройки</a></li> -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a on:click|preventDefault={user.logout}>Выйти</a></li>
      {:else}
        <li><a href="/register">Регистрация</a></li>
        <li><a href="/login">Войти</a></li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  header {
    height: 6rem;
    box-sizing: border-box;
    background-color: var(--background-accent);
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow-x: hidden;
    height: 100%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 0.75em;
    gap: 0;
  }
  ul.pages {
    justify-content: center;
  }
  ul.user-actions {
    justify-content: center;
  }
  li a,
  li span {
    padding: 0 0.5rem;
  }
  li span.username {
    font-size: 1.2em;
    color: var(--text-accent);
  }
  li a {
    font-weight: bold;
  }

  @media (min-width: 720px) {
    header {
      height: 4rem;
    }
    nav {
      height: 100%;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
