<script lang="ts">
  import type { TableViewModel } from "svelte-headless-table";
  import Cross2 from "svelte-radix/Cross2.svelte";
  import type { Writable } from "svelte/store";
  import type { Task } from "../schemas.js";
  import { DataTableViewOptions } from "./";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ButtonExport } from "$lib/components/custom";
  import { Input } from "$lib/components/ui/input/index.js";

  export let tableModel: TableViewModel<Task>;

  const { pluginStates } = tableModel;
  const {
    filterValue,
  }: {
    filterValue: Writable<string>;
  } = pluginStates.filter;

  const {
    filterValues,
  }: {
    filterValues: Writable<{
      status: string[];
      priority: string[];
    }>;
  } = pluginStates.colFilter;

  $: showReset = Object.values({ ...$filterValues, $filterValue }).some(
    (v) => v.length > 0,
  );
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Buscar por nombre o rut..."
      class="h-8 w-[150px] lg:w-[250px]"
      type="search"
      bind:value={$filterValue}
    />

    {#if showReset}
      <Button
        on:click={() => {
          $filterValue = "";
          $filterValues.status = [];
          $filterValues.priority = [];
        }}
        variant="ghost"
        class="h-8 px-2 lg:px-3"
      >
        Limpiar
        <Cross2 class="ml-2 h-4 w-4" />
      </Button>
    {/if}
  </div>

  <div class="ml-auto flex items-center pr-2">
    <ButtonExport />
  </div>

  <DataTableViewOptions {tableModel} />
</div>
