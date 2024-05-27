<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  import { OrderForm } from "$lib/forms";
</script>

<Tabs.Root value="order" class="w-full max-w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="order">Ordenar</Tabs.Trigger>
    <Tabs.Trigger value="consult">Consultar</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="order">
    <OrderForm />
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
