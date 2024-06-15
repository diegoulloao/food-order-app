<script lang="ts">
  import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { CheckIcon, Timer, X } from "lucide-svelte";
  import type { Order } from "$lib/types";

  export let row: Order;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    >
      <DotsHorizontal class="h-4 w-4" />
      <span class="sr-only">Open Menu</span>
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content class="max-w-[180px]" align="end">
    <DropdownMenu.Item
      class="flex items-center space-x-2"
      on:click={() => console.log({ row })}
    >
      <CheckIcon class="h-4 w-4 text-muted-foreground/70" />
      <p>Marcar entregado</p>
    </DropdownMenu.Item>

    <DropdownMenu.Item
      class="flex items-center space-x-2"
      on:click={() => console.log({ row })}
    >
      <Timer class="h-4 w-4 text-muted-foreground/70" />
      <p>Marcar pendiente</p>
    </DropdownMenu.Item>

    <DropdownMenu.Separator />

    <DropdownMenu.Item
      class="flex items-center space-x-2"
      on:click={() => console.log({ row })}
    >
      <X class="h-4 w-4 text-muted-foreground/70" />
      <p>Borrar</p>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
