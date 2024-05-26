<script lang="ts">
  import File from "lucide-svelte/icons/file";
  import Home from "lucide-svelte/icons/home";
  import LineChart from "lucide-svelte/icons/line-chart";
  import Package from "lucide-svelte/icons/package";
  import Package2 from "lucide-svelte/icons/package-2";
  import PanelLeft from "lucide-svelte/icons/panel-left";
  import CirclePlus from "lucide-svelte/icons/circle-plus";
  // import Search from "lucide-svelte/icons/search";
  import LogOut from "lucide-svelte/icons/log-out";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import UsersRound from "lucide-svelte/icons/users-round";

  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  // import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  import { OrdersTable } from "$lib/components/custom";
  import orders from "$lib/data/orders.json";
</script>

<div class="flex min-h-screen w-full flex-col">
  <aside
    class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
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
            <ShoppingCart
              class="h-5 w-5 transition-all group-hover:scale-110"
            />
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

  <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header
      class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
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
            <a
              href="##"
              class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
              <span class="sr-only">Acme Inc</span>
            </a>

            <a
              href="##"
              class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home class="h-5 w-5" />
              Dashboard
            </a>

            <a
              href="##"
              class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart class="h-5 w-5" />
              Orders
            </a>

            <a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
              <Package class="h-5 w-5" />
              Products
            </a>
            <a
              href="##"
              class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <UsersRound class="h-5 w-5" />
              Customers
            </a>

            <a
              href="##"
              class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart class="h-5 w-5" />
              Settings
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

    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs.Root value="all">
        <div class="flex items-center">
          <!-- TODO: add something -->

          <div class="ml-auto flex items-center gap-2">
            <Button size="sm" class="h-7 gap-1">
              <File class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
          </div>
        </div>

        <Tabs.Content value="all">
          <Card.Root>
            <Card.Header>
              <Card.Title>Pedidos</Card.Title>

              <Card.Description>
                A continuación se listan todos los pedidos realizados hasta este
                momento.
              </Card.Description>
            </Card.Header>

            <Card.Content>
              <OrdersTable data={orders} />
            </Card.Content>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </main>
  </div>
</div>
