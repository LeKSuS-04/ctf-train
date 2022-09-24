<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<span class="error" transition:slide={{ duration: 300, easing: quintOut }}>
  <slot />
</span>

<style>
  .error {
    display: block;
    text-align: center;
    color: var(--text-error);
  }
</style>
