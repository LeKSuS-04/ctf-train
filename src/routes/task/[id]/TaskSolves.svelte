<script>
  import { faDroplet } from "@fortawesome/free-solid-svg-icons";
  import Table from "$lib/components/Table.svelte";

  export let usersSolved;

  const config = {
    templateLink: "/user/{}",
    fields: [
      {
        realName: "username",
        shownName: "Юзер",
        style: {
          class: "username",
          width: "26%",
          hideOverflow: true,
          onMobile: {
            width: "50%"
          }
        }
      },
      {
        realName: "fio",
        shownName: "ФИО",
        hideOverflow: true,
        style: {
          class: "fio",
          width: "44%",
          hideOverflow: true,
          onMobile: {
            hidden: true
          }
        }
      },
      {
        realName: "time",
        shownName: "Время сдачи",
        style: {
          class: "time",
          width: "40%",
          monospace: true,
          textAlign: "center",
          onMobile: {
            width: "50%"
          }
        }
      }
    ],
    placement: {
      icons: {
        1: {
          icon: faDroplet,
          primaryColor: "var(--first-blood)"
        }
      }
    }
  };
</script>

<section class="scoreboard">
  <Table className="global-task-scoreboard" entries={usersSolved} {config} />
</section>

<style>
  .scoreboard {
    margin-top: 2rem;
    width: 100vw;
  }

  @media (min-width: 720px) {
    .scoreboard {
      max-width: 720px;
    }
  }
</style>
