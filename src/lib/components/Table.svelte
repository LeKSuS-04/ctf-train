<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";

  export let entries;
  export let config;
  export let className;

  let windowWidth;

  $: onMobile = windowWidth <= 720;

  function formatString(string, data) {
    return string.replace(/{}/g, data);
  }

  $: parseStyle = (style) => {
    if (!style) return "";

    function parseSimpleProps(styleProps) {
      let styleString = "";

      if (styleProps.width) {
        styleString += `width: ${styleProps.width};`;
      }

      if (styleProps.hidden) {
        styleString += `display: none;`;
      }

      if (styleProps.monospace) {
        styleString += `font-family: var(--font-mono);`;
      }

      if (styleProps.textAlign) {
        styleString += `text-align: ${styleProps.textAlign};`;
      }

      if (styleProps.hideOverflow) {
        styleString += `
          max-width: 1px;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
        `;
      }

      return styleString;
    }

    let result = parseSimpleProps(style);
    if (onMobile && style.onMobile) {
      result = result + parseSimpleProps(style.onMobile);
    }

    return result;
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<table class={`info-table ${className}`}>
  <thead>
    <tr>
      {#if config.placement}
        <th class="place" style={config.placement.style}>#</th>
      {/if}
      {#each config.fields as field}
        <th class={field.style?.class} style={parseStyle(field.style)}>{field.shownName}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each entries as entry, i}
      {@const order = i + 1}
      <tr on:click={goto(formatString(config.templateLink, entry.id))} class="row-{order % 2}">
        {#if config.placement}
          {@const icons = config.placement.icons}
          <td class="place" style={config.placement.style}>
            {#if icons && icons[order]}
              {#each ["normal", "hovered"] as medalClass}
                <span class={medalClass}>
                  <Fa {...icons[order]} />
                </span>
              {/each}
            {:else}
              {order}
            {/if}
          </td>
        {/if}

        {#each config.fields as field}
          <td class={field.style?.class} style={parseStyle(field.style)}>
            {entry[field.realName]}
          </td>
        {/each}

        {#if config.actions}
          <td class="actions" on:click|stopPropagation>
            {#each config.actions as action}
              <form action={action.link} method="POST" use:enhance>
                <input name="id" id="id" value={entry.id} hidden />
                <button style:--fade-color={action.fadeColor ?? "var(--primary)"}>
                  <Fa icon={action.icon} />
                </button>
              </form>
            {/each}
          </td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table.info-table {
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

  tr.row-0 {
    background-color: var(--background);
  }
  tr.row-1 {
    background-color: var(--background-accent);
  }

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
  tr .hovered {
    display: none;
  }
  tr:hover .hovered {
    display: unset;
  }
  tr:hover .normal {
    display: none;
  }

  td.actions {
    background-color: var(--background);
    padding-left: 0.2em;
  }
  td.actions:hover {
    cursor: initial;
  }
  td.actions button {
    padding: 0.2em 0.4em;
    margin: 0;
    background-color: unset;
  }
  td.actions button:hover {
    color: var(--fade-color);
    background-color: var(--surface);
  }
</style>
