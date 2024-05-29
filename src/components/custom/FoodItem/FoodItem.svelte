<script lang="ts">
  import { dateTime, currency } from "$lib/utils/formatter";
  import { cn } from "$lib/utils";
  import type { Order } from "$lib/types";

  // props
  export let order: Order;
  export let price: number;
</script>

<div class="space-y-8 text-sm">
  <div class="flex items-center">
    <div class="relative overflow-visible">
      <img
        class="portrait h-16 w-16 rounded-md object-cover transition-all"
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&dpr=2&q=80"
        alt="food"
      />

      <div
        class={cn(
          "absolute right-0 top-0 flex h-5 w-5 -translate-y-1.5 translate-x-1.5 items-center justify-center ",
          "rounded-full bg-primary text-xs leading-none text-primary-foreground",
        )}
      >
        {order.amount}
      </div>
    </div>

    <div class="ml-3 space-y-0.5 md:ml-4">
      <p class="text-md line-clamp-1 font-medium leading-none text-foreground">
        Ensalada rusa y Chuleta de cerdo
      </p>

      <p class="line-clamp-1 text-sm text-muted-foreground">
        Pedido el {dateTime.format(new Date(order.created_at))} hrs
      </p>

      <div class="ml-auto font-medium text-foreground">
        {currency.format(price)}
      </div>
    </div>
  </div>
</div>
