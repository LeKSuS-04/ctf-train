<script>
  import { faCrown, faMedal } from "@fortawesome/free-solid-svg-icons";
  import UserTable from "../../lib/UserTable.svelte";

  export let data;

  const config = {
    fields: [
      {
        realName: "login",
        shownName: "Юзер",
        class: "login"
      },
      {
        realName: "fio",
        shownName: "ФИО",
        class: "fio"
      },
      {
        realName: "score",
        shownName: "Результат",
        class: "score"
      }
    ],
    icons: {
      1: {
        icon: faCrown,
        primaryColor: "var(--gold)"
      },
      2: {
        icon: faMedal,
        primaryColor: "var(--silver)"
      },
      3: {
        icon: faMedal,
        primaryColor: "var(--bronze)"
      }
    }
  };
</script>

<UserTable className="global-scoreboard" users={data.users} {config} />

<style>
  :global(.global-scoreboard th.login) {
    width: 70%;
  }
  :global(.global-scoreboard th.fio) {
    width: 70%;
  }

  :global(.global-scoreboard .score) {
    text-align: center;
    font-family: var(--font-mono);
  }

  :global(.global-scoreboard td.login),
  :global(.global-scoreboard td.fio) {
    max-width: 1px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  :global(.global-scoreboard .fio) {
    display: none;
  }
  @media (min-width: 720px) {
    :global(.global-scoreboard th.login) {
      width: 30%;
    }
    :global(.global-scoreboard .fio) {
      display: table-cell;
    }
  }
</style>
