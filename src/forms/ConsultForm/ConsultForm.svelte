<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { PhoneInput } from "$lib/components/custom";
</script>

<Card.Root>
  <Card.Header class="pb-3">
    <Card.Title>Consultar reservas</Card.Title>
    <Card.Description>
      Ingresa tu celular para ver tus reservas.
    </Card.Description>
  </Card.Header>

  <Card.Content class="space-y-2">
    <div class="space-y-1">
      <Label for="cellphone">Celular</Label>
      <PhoneInput id="cellphone" placeholder="xxxx xxxx" />
    </div>
  </Card.Content>

  <Card.Footer>
    <Button class="mt-0">Consultar</Button>
  </Card.Footer>
</Card.Root>
