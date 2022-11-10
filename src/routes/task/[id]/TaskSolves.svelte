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
          width: "calc(25% - var(--place-width))",
          hideOverflow: true,
          onMobile: {
            width: "calc(50% - var(--place-width))"
          }
        }
      },
      {
        realName: "fio",
        shownName: "ФИО",
        hideOverflow: true,
        style: {
          class: "fio",
          width: "1fr",
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
          width: "31%",
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
  {#if usersSolved.length > 0}
    <Table className="global-task-scoreboard" entries={usersSolved} {config} />
  {:else}
    <h2 class="disabled">Таск ещё никем не решен... Ты можешь быть первым!</h2>
  {/if}
</section>

<style>
  .scoreboard {
    margin-top: 2rem;
    width: 100vw;
  }

  .disabled {
    color: var(--text-inactive);
    text-align: center;
    margin-top: 40%;
  }

  @media (min-width: 720px) {
    .scoreboard {
      max-width: 720px;
    }
  }
</style>
