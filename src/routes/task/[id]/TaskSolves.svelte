<script>
  import { faDroplet } from "@fortawesome/free-solid-svg-icons";
  import UserTable from "../../../lib/UserTable.svelte";

  export let usersSolved;

  const config = {
    fields: [
      {
        realName: "username",
        shownName: "Юзер",
        class: "username"
      },
      {
        realName: "fio",
        shownName: "ФИО",
        class: "fio"
      },
      {
        realName: "time",
        shownName: "Время сдачи",
        class: "time"
      }
    ],
    icons: {
      1: {
        icon: faDroplet,
        primaryColor: "var(--first-blood)"
      }
    }
  };
</script>

<section class="scoreboard">
  <UserTable className="global-task-scoreboard" users={usersSolved} {config} />
</section>

<style>
  .scoreboard {
    margin-top: 2rem;
    width: 100vw;
  }

  :global(.global-task-scoreboard th.username) {
    width: 60%;
  }
  :global(.global-task-scoreboard th.fio) {
    width: 42%;
  }
  :global(.global-task-scoreboard th.time) {
    width: 40%;
  }

  :global(.global-task-scoreboard .time) {
    text-align: center;
    font-family: var(--font-mono);
  }

  :global(.global-task-scoreboard td.username),
  :global(.global-task-scoreboard td.fio) {
    max-width: 1px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  :global(.global-task-scoreboard .fio) {
    display: none;
  }
  @media (min-width: 768px) {
    .scoreboard {
      width: 768px;
    }
    :global(.global-task-scoreboard th.username) {
      width: 30%;
    }
    :global(.global-task-scoreboard th.time) {
      width: 28%;
    }
    :global(.global-task-scoreboard .fio) {
      display: table-cell;
    }
  }
</style>
