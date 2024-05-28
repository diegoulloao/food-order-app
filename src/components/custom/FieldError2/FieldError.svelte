<script lang="ts">
  import type { ActionInputError } from "astro:actions";

  // types
  type T = Record<string, any>;

  // props
  export let errors: ActionInputError<T>["fields"] | null;
  export let name: keyof T;

  // reactive
  $: error = errors?.[name]?.[0];
</script>

{#if error}
  <div class="text-xs text-red-500">{error}</div>
{/if}
