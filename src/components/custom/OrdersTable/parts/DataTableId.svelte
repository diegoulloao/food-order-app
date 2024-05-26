<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  // props
  export let value: number;
</script>

<div>
  <Badge variant="outline">
    PED-{value < 999 ? ("00" + value).slice(-3) : value}
  </Badge>
</div>
