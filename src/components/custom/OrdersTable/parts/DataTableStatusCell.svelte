<script lang="ts">
  import { format as rutFormat } from "rut.js";

  export let value: string;

  // TODO: fix icon
  // const Icon = status?.icon;
</script>

<div class="flex w-[100px] items-center">
  <!-- {#if Icon}
      <Icon class="mr-2 h-4 w-4 text-muted-foreground" />
    {/if} -->
  <span>{rutFormat(value)}</span>
</div>
