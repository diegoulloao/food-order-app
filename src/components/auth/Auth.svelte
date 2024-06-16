<script lang="ts">
  import { onMount } from "svelte";
  import { app } from "$lib/stores";
  import type { User } from "@supabase/supabase-js";

  // props
  export let user: User | null;

  // lifecycle
  onMount(() => {
    $app.user = user;
  });
</script>
