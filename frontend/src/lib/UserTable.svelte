<script>
	import Fa from 'svelte-fa/src/fa.svelte';
  import { goto } from '$app/navigation';

  export let users;
  export let config;
  export let className;
</script>

<table class={className}>
  <thead>
    <tr>
      <th class="place">#</th>
      {#each config.fields as field}
        <th class={field.class}>{field.shownName}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each users as user, i}
      {@const place = i + 1}
      <tr on:click={goto(`/user/${user.id}`)} class="row-{place % 2}">
        <td class="place">
          {#if config.icons.hasOwnProperty(place) }
            {#each ['normal', 'hovered'] as medalClass}
              <span class={medalClass}>
                <Fa {...config.icons[place]} />
              </span>
            {/each}
          {:else}
            {place}
          {/if}
        </td>
        
        {#each config.fields as field}
          <td class={field.class}>{user[field.realName]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
	table {
		display: block;
		width: 100%;
    max-width: 1024px;
    border-collapse: collapse;
    border-spacing: 0;
    line-height: 2.5;
	}
	thead {
		text-align: left;
		color: var(--text-accent);
		font-weight: bold;
		font-size: 1.2em;
	}
  thead th {
    padding: 0 0.5em;
  }
  
  tr.row-0 { background-color: var(--background); }
  tr.row-1 { background-color: var(--background-accent); }
  
	.place {
    text-align: center;
    font-family: var(--font-mono);
    padding: 0.2rem 1em;
    color: var(--text-accent);
  }
  tbody tr:hover {
    cursor: pointer;
    background-color: var(--primary);
    color: var(--background);
  }
  tbody tr:hover .place {
    color: var(--background);
  }

  .hovered {
    --gold: var(--background);
    --silver: var(--background);
    --bronze: var(--background);
    --first-blood: bar(--background);
  }
  tr .hovered { display: none; }
  tr:hover .hovered { display: unset; }
  tr:hover .normal { display: none; }
</style>