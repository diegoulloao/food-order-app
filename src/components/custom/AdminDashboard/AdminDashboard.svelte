<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { OrdersTable, Error } from "$lib/components/custom";
  import type { OrdersData } from "$lib/types";

  // props
  let orders: OrdersData;
  export { orders as data };
</script>

<main id="admin-dashboard" class="w-full gap-4 md:gap-8">
  <Card.Root>
    <Card.Header>
      <Card.Title>Pedidos</Card.Title>

      <Card.Description>
        A continuación se listan todos los pedidos realizados hasta este
        momento.
      </Card.Description>
    </Card.Header>

    <Card.Content>
      {#if orders}
        <OrdersTable data={orders} />
      {:else}
        <div class="flex flex-col items-center space-y-3 py-8">
          <Error />

          <h2 class="text-xl font-normal text-muted-foreground">
            Lo lamentamos, no pudimos cargar los pedidos :(
          </h2>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</main>
