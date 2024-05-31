<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Home, LogOut, ShoppingCart } from "lucide-svelte/icons";
</script>

<aside
  class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex lg:py-2"
>
  <nav class="flex flex-col items-center gap-4 px-2 py-4">
    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <a
          href="##"
          class="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          use:builder.action
          {...builder}
        >
          <Home class="h-5 w-5" />
          <span class="sr-only">Inicio</span>
        </a>
      </Tooltip.Trigger>

      <Tooltip.Content side="right">Inicio</Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <a
          href="##"
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          use:builder.action
          {...builder}
        >
          <ShoppingCart class="h-5 w-5 transition-all group-hover:scale-110" />
          <span class="sr-only">Pedidos</span>
        </a>
      </Tooltip.Trigger>

      <Tooltip.Content side="right">Pedidos</Tooltip.Content>
    </Tooltip.Root>
  </nav>

  <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
    <Tooltip.Root>
      <Tooltip.Trigger asChild let:builder>
        <a
          href="##"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          use:builder.action
          {...builder}
        >
          <LogOut class="h-5 w-5" />
          <span class="sr-only">Salir</span>
        </a>
      </Tooltip.Trigger>

      <Tooltip.Content side="right">Salir</Tooltip.Content>
    </Tooltip.Root>
  </nav>
</aside>
