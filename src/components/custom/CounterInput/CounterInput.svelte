<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Plus, Minus } from "lucide-svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  // props
  export let value: number = 1;

  // types
  interface $$Props extends HTMLInputAttributes {}

  // helpers
  const withLimit = (newValue: number): number => {
    const min: number = +$$restProps["min"] ?? 1;
    const max: number = +$$restProps["max"] ?? 10;

    if (newValue < min || newValue > max) return value;
    return newValue;
  };
</script>

<div class="touch-manipulation select-none">
  <div class="flex items-center">
    <Button
      size="sm"
      variant="secondary"
      class="m-0 h-6 w-6 rounded-lg p-0"
      on:click={() => (value = withLimit(value - 1))}
    >
      <Minus class="h-3 w-3" />
    </Button>

    <span class="w-9 text-center text-secondary-foreground">
      {value}
    </span>

    <Button
      size="sm"
      variant="secondary"
      class="m-0 h-6 w-6 rounded-lg p-0"
      on:click={() => (value = withLimit(value + 1))}
    >
      <Plus class="h-3 w-3" />
    </Button>
  </div>

  <Input {value} class="hidden" {...$$restProps} />
</div>
