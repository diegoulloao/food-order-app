<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";
  import type { HTMLInputAttributes } from "svelte/elements";

  let className: HTMLInputAttributes["class"] = undefined;
  export { className as class };

  // states
  let value: string = "";

  // types
  interface $$Props extends Exclude<HTMLInputAttributes, "type" | "class"> {}

  // helpers
  const formatCellphone = (e: InputEvent): void => {
    const newValue: string = (e.target as HTMLInputElement).value;
    value = newValue.replace(/\D+/g, "");
  };
</script>

<div class="relative">
  <Input
    {...$$restProps}
    type="tel"
    class={cn(className, "pl-14")}
    on:input={formatCellphone}
    maxlength={8}
    bind:value
  />

  <div
    class="pointer-events-none absolute bottom-0 left-1.5 top-0 m-auto flex h-5 select-none items-center rounded border bg-muted px-1 py-3"
  >
    <span class="text-xs">+56 9</span>
  </div>
</div>
