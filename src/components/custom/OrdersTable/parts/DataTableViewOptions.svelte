<script lang="ts">
  import MixerHorizontal from "svelte-radix/MixerHorizontal.svelte";
  import type { TableViewModel } from "svelte-headless-table";
  import type { Task } from "../schemas.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  export let tableModel: TableViewModel<Task>;
  const { pluginStates, flatColumns } = tableModel;
  const { hiddenColumnIds } = pluginStates.hide;

  function handleHide(id: string) {
    hiddenColumnIds.update((ids: string[]) => {
      if (ids.includes(id)) {
        return ids.filter((i) => i !== id);
      }
      return [...ids, id];
    });
  }

  const hidableCols = ["address", "cellphone", "id"];
</script>

<div class="flex items-center space-x-2">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        builders={[builder]}
      >
        <MixerHorizontal class="mr-2 h-4 w-4" />
        Columnas
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Label>Mostrar columnas</DropdownMenu.Label>

      <DropdownMenu.Separator />
      {#each flatColumns as col}
        {#if hidableCols.includes(col.id)}
          <DropdownMenu.CheckboxItem
            checked={!$hiddenColumnIds.includes(col.id)}
            on:click={() => handleHide(col.id)}
          >
            {col.header}
          </DropdownMenu.CheckboxItem>
        {/if}
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
