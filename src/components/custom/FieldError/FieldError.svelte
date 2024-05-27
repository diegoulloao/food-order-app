<script lang="ts">
  // props
  // TODO: how to hell type this shit!!
  export let errors: any;
  export let name: string;
</script>

{#if !!Object.keys(errors?.[name] ?? {}).length && !!errors[name]._errors?.length}
  <div class="text-xs text-red-500">
    {errors[name]._errors[0]}
  </div>
{/if}
