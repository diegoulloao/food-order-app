<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { FoodView } from "$lib/components/custom";
  import { RotateCcw, ArrowLeft } from "lucide-svelte/icons";

  import { createOrder } from "$lib/fetch";

  // states
  let loading: boolean = false;
  let success: boolean | null = null;
  let sent: boolean = false;

  // handlers
  const onMakeOrder = async (): Promise<void> => {
    loading = true;
    const result = await createOrder({});
    loading = false;

    success = result.status === 202;
    sent = true;
  };

  const resetForm = (): void => {
    success = null;
    sent = false;
  };
</script>

<Tabs.Root value="order" class="w-full max-w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="order">Ordenar</Tabs.Trigger>
    <Tabs.Trigger value="consult">Consultar</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="order">
    <Card.Root>
      <Card.Header>
        <Card.Title>Ordenar</Card.Title>
        <Card.Description>
          <div class="flex flex-col space-y-5">
            <p>Completa los datos para ordenar tu comida!</p>
            <FoodView />
          </div>
        </Card.Description>
      </Card.Header>

      <Card.Content class="space-y-2">
        {#if !sent}
          <div class="space-y-1">
            <Label for="cellphone">Celular</Label>
            <Input id="cellphone" value="+56950011898" />
          </div>

          <div class="space-y-1">
            <Label for="name">Nombre</Label>
            <Input id="name" value="Pedro Duarte" data-1p-ignore />
          </div>

          <div class="space-y-1">
            <Label for="amount">Cantidad</Label>

            <Input
              id="amount"
              type="number"
              value="1"
              min="1"
              max="10"
              data-1p-ignore
            />
          </div>
        {:else}
          <!-- TODO: add success screen -->
          <div>Enviado!</div>
        {/if}
      </Card.Content>

      <Card.Footer>
        {#if !sent}
          <Button
            disabled={loading}
            on:click={onMakeOrder}
            class="flex items-center"
          >
            {#if loading}
              <RotateCcw class="mr-2 h-4 w-4 animate-spin" />
            {/if}

            Hacer pedido
          </Button>
        {:else}
          <Button on:click={resetForm}>
            <ArrowLeft class="mr-2 h-4 w-4" />
            Pedir nuevo
          </Button>
        {/if}
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>

  <Tabs.Content value="consult">
    <Card.Root>
      <Card.Header>
        <Card.Title>Consultar</Card.Title>
        <Card.Description
          >Consulta tus pedidos activos ingresando tu celular.</Card.Description
        >
      </Card.Header>

      <Card.Content class="space-y-2">
        <div class="space-y-1">
          <Label for="cellphone">Celular</Label>
          <Input id="cellphone" value="+56950011898" />
        </div>
      </Card.Content>

      <Card.Footer>
        <Button>Consultar</Button>
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>
