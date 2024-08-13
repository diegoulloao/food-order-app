<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { orderId } from "$lib/utils/formatter";

  // props
  export let value: number;
</script>

<div>
  <Badge variant="outline">
    {orderId(value)}
  </Badge>
</div>
