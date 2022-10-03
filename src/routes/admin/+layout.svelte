<nav>
  <ul>
    <li><a href="/admin">Общее</a></li>
    <li><a href="/admin/contests">Контесты</a></li>
    <li><a href="/admin/tasks">Таски</a></li>
    <li><a href="/admin/users">Юзеры</a></li>
    <li><a href="/admin/solves">Солвы</a></li>
    <li><a href="/admin/groups">Группы</a></li>
  </ul>
</nav>

<slot />

<section class="dummy" />

<style>
  nav {
    background-color: var(--background-accent);
    width: 100vw;
    margin-bottom: 1em;
  }
  ul {
    list-style: none;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  a {
    padding: 1em;
  }

  .dummy {
    margin-bottom: auto;
  }
</style>
