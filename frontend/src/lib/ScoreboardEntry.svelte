<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCrown, faMedal } from '@fortawesome/free-solid-svg-icons';
  import { goto } from '$app/navigation';

  export let id;
  export let place
  export let login;
  export let fio;
  export let score;
</script>

<tr on:click={goto(`/user/${id}`)} class="row-{place % 2}">
  <td class="place">
    {#if place < 4 }
      {#each ['normal', 'hovered'] as medalClass}
        <span class={medalClass}>
          {#if place === 1}
            <Fa icon={faCrown} primaryColor="var(--gold)" />
          {:else if place === 2}
            <Fa icon={faMedal} primaryColor="var(--silver)" />
          {:else if place === 3}
            <Fa icon={faMedal} primaryColor="var(--bronze)" />
          {/if}
        </span>
      {/each}
    {:else}
      {place}
    {/if}
  </td>
  <td class="login">{login}</td>
  <td class="fio">{fio}</td>
  <td class="score">{score}</td>
</tr>
