<script>
  import Fa from "svelte-fa/src/fa.svelte";
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";

  export let entries;
  export let config;
  export let className;

  let windowWidth;

  $: onMobile = windowWidth <= 720;

  function formatString(string, data) {
    return string.replace(/{}/g, data);
  }

  $: getGridTemplateRows = () => {
    const elements = [];
    if (config.placement) {
      elements.push("var(--place-width)");
    }
    for (const { style } of config.fields) {
      if (onMobile && style?.onMobile?.hidden) {
        continue;
      } else if (onMobile && style?.onMobile?.width) {
        elements.push(style.onMobile.width);
      } else if (style?.hidden) {
        continue;
      } else if (style?.width) {
        elements.push(style.width);
      } else {
        elements.push("1fr");
      }
    }
    if (config.actions) {
      for (let i = 0; i < config.actions.length; i++) {
        elements.push("var(--action-width)");
      }
    }
    return elements.join(" ");
  };

  $: parseStyle = (style) => {
    if (!style) return "";

    function parseSimpleProps(styleProps) {
      let styleString = "";

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

<section class={`table ${className}`}>
  <header style:grid-template-columns={getGridTemplateRows(config.fields)}>
    {#if config.placement}
      <div class="place" style={config.placement.style}>#</div>
    {/if}
    {#each config.fields as field}
      <div class={field.style?.class} style={parseStyle(field.style)}>{field.shownName}</div>
    {/each}
  </header>
  <section class="entries">
    {#each entries as entry, i}
      {@const order = i + 1}
      <a
        href={formatString(config.templateLink, entry.id)}
        style:grid-template-columns={getGridTemplateRows(config.fields)}
        class="row row-{order % 2}"
      >
        {#if config.placement}
          {@const icons = config.placement.icons}
          <div class="place item" style={config.placement.style}>
            {#if icons && icons[order]}
              {#each ["normal", "hovered"] as medalClass}
                <span class={medalClass}>
                  <Fa {...icons[order]} />
                </span>
              {/each}
            {:else}
              {order}
            {/if}
          </div>
        {/if}

        {#each config.fields as field, i}
          <div
            class={`item ${field.style?.class}`}
            style={parseStyle(field.style)}
            style:padding-left={config.placement || i > 0 ? "" : "1em"}
            style:padding-right={config.actions || i === config.fields.length - 1 ? "" : "1em"}
          >
            {entry[field.realName]}
          </div>
        {/each}

        {#if config.actions}
          <div class="item actions" on:click|stopPropagation>
            {#each config.actions as action}
              <form action={action.link} method="POST" use:enhance>
                <input name="id" id="id" value={entry.id} hidden />
                <button style:--fade-color={action.fadeColor ?? "var(--primary)"}>
                  <Fa icon={action.icon} />
                </button>
              </form>
            {/each}
          </div>
        {/if}
      </a>
    {/each}
  </section>
</section>

<style>
  section.table {
    width: 100%;
    max-width: 1024px;
  }
  header {
    text-align: left;
    color: var(--text-accent);
    font-weight: bold;
    font-size: 1.2em;
    width: 100%;
  }
  header,
  a.row {
    --place-width: 3em;
    --action-width: 4em;
    display: grid;
    width: 100%;
    line-height: 2.5;
    overflow-x: hidden;
  }
  a.row {
    color: var(--text-color);
  }
  a.row.row-0 {
    background-color: var(--background);
  }
  a.row.row-1 {
    background-color: var(--background-accent);
  }
  a.row:hover {
    transition-duration: unset;
    text-decoration: none;
    cursor: pointer;
    background-color: var(--primary);
    color: var(--background);
  }
  a.row:hover .item,
  a.row:hover .item.actions button {
    color: var(--background);
  }
  .hovered {
    --gold: var(--background);
    --silver: var(--background);
    --bronze: var(--background);
    --first-blood: bar(--background);
  }
  a.row .hovered {
    display: none;
  }
  a.row:hover .hovered {
    display: unset;
  }
  a.row:hover .normal {
    display: none;
  }

  .place {
    text-align: center;
    font-family: var(--font-mono);
    padding: 0.2rem 1em;
    color: var(--text-accent);
  }

  .item.actions {
    padding-left: 0.2em;
  }
  .item.actions:hover {
    cursor: initial;
  }
  .item.actions button {
    padding: 0.2em 0.4em;
    width: 2em;
    margin: 0 1em;
    background-color: unset;
  }
  .item.actions button:hover {
    color: var(--fade-color) !important;
    background-color: var(--surface);
  }
</style>
