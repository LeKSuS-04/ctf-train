<script>
  import { faCrown, faMedal } from "@fortawesome/free-solid-svg-icons";
  import Table from "$lib/components/Table.svelte";

  export let data;

  const config = {
    templateLink: "/user/{}",
    fields: [
      {
        realName: "username",
        shownName: "Юзер",
        style: {
          class: "username",
          width: "calc(30% - var(--place-width))",
          hideOverflow: true,
          onMobile: {
            width: "calc(70% - var(--place-width))"
          }
        }
      },
      {
        realName: "fio",
        shownName: "ФИО",
        style: {
          class: "fio",
          width: "60%",
          hideOverflow: true,
          onMobile: {
            hidden: true
          }
        }
      },
      {
        realName: "score",
        shownName: "Результат",
        style: {
          class: "score",
          monospace: true,
          width: "10%",
          textAlign: "center",
          onMobile: {
            width: "30%"
          }
        }
      }
    ],
    placement: {
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
    }
  };
</script>

{#if data.users.length > 0}
  <Table className="global-scoreboard" entries={data.users} {config} />
{:else}
  <h1 class="disabled">Пока никто не зарегистрировался :(</h1>
{/if}

<style>
  .disabled {
    color: var(--text-inactive);
  }
</style>
