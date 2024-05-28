<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import { OrderForm, ConsultForm } from "$lib/forms";
</script>

<Tabs.Root value="order" class="w-full max-w-[400px]">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="order">Reserva</Tabs.Trigger>
    <Tabs.Trigger value="consult">Consulta</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="order">
    <OrderForm />
  </Tabs.Content>

  <Tabs.Content value="consult">
    <ConsultForm />
  </Tabs.Content>
</Tabs.Root>
