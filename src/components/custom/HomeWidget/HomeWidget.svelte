<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { FoodView } from "$lib/components/custom";
</script>

<Tabs.Root value="order" class="w-[400px]">
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
        <div class="space-y-1">
          <Label for="rut">Rut</Label>
          <Input id="rut" value="12136897-8" />
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
      </Card.Content>

      <Card.Footer>
        <Button>Hacer pedido</Button>
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>

  <Tabs.Content value="consult">
    <Card.Root>
      <Card.Header>
        <Card.Title>Consultar</Card.Title>
        <Card.Description
          >Consulta tus pedidos activos ingresando tu rut.</Card.Description
        >
      </Card.Header>

      <Card.Content class="space-y-2">
        <div class="space-y-1">
          <Label for="rut">Rut</Label>
          <Input id="rut" value="12136897-8" />
        </div>
      </Card.Content>

      <Card.Footer>
        <Button>Consultar</Button>
      </Card.Footer>
    </Card.Root>
  </Tabs.Content>
</Tabs.Root>
