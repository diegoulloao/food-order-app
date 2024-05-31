<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Home, PanelLeft, ShoppingCart, User } from "lucide-svelte/icons";
  import { cn } from "$lib/utils";
  import type { ClassValue } from "clsx";

  // props
  let className: ClassValue = null;
  export { className as class };
</script>

<header
  class={cn(
    "sticky top-0 z-30 flex h-auto w-full gap-4 border-b bg-background p-2 sm:static lg:border-none lg:bg-transparent",
    "flex items-center",
    className,
  )}
>
  <Sheet.Root>
    <Sheet.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        size="icon"
        variant="outline"
        class="sm:hidden"
      >
        <PanelLeft class="h-5 w-5" />
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </Sheet.Trigger>

    <Sheet.Content side="left" class="sm:max-w-xs">
      <nav class="grid gap-6 text-lg font-medium">
        <div class="mb-6 flex items-center space-x-3">
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <User class="h-4 w-4 transition-all" />
            <span class="sr-only">Acme Inc</span>
          </div>

          <p class="text-sm font-normal">Juanito Pérez</p>
        </div>

        <a
          href="##"
          class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          <Home class="h-5 w-5" />
          Inicio
        </a>

        <a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
          <ShoppingCart class="h-5 w-5" />
          Pedidos
        </a>
      </nav>
    </Sheet.Content>
  </Sheet.Root>

  <Breadcrumb.Root class="hidden md:flex">
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="##">Panel de Administración</Breadcrumb.Link>
      </Breadcrumb.Item>

      <Breadcrumb.Separator />

      <Breadcrumb.Item>
        <Breadcrumb.Page>Pedidos</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <!-- middle content -->
  <div class="relative ml-auto flex-1 md:grow-0" />

  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        size="icon"
        class="h-8 w-8 overflow-hidden rounded-full"
      >
        <img
          src="/img/placeholder-user.jpg"
          width={36}
          height={36}
          alt="Avatar"
          class="overflow-hidden rounded-full"
        />
      </Button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content align="end">
      <DropdownMenu.Label>Cuenta</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Cerrar sesión</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>
