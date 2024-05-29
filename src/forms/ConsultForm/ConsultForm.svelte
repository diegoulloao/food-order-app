<script lang="ts">
  import { actions, isInputError } from "astro:actions";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { PhoneInput, FieldError2, FoodItem } from "$lib/components/custom";
  import { getItemsTotal } from "$lib/helpers";
  import { RotateCcw, ArrowLeft } from "lucide-svelte/icons";
  import type { OrdersData } from "$lib/types";
  import type { Consult } from "$lib/validation";
  import type { ActionInputError } from "astro:actions";

  // constants
  const price: number = 4990;

  // states
  let orders: OrdersData = null;
  let loading: boolean = false;
  let sent: boolean = false;
  let success: boolean | null = null;
  let errors: ActionInputError<Consult>["fields"] | null = null;

  // handlers
  const onConsult = async (e: SubmitEvent): Promise<void> => {
    const formData = new FormData(e.target as HTMLFormElement);

    loading = true;
    const { data, error } = await actions.consult.safe(formData);
    loading = false;

    if (error && isInputError(error)) {
      errors = error.fields;
      return;
    }

    errors = null;
    orders = data ?? null;
    success = sent = true;
  };

  const resetForm = (): void => {
    success = null;
    sent = false;
  };
</script>

<Card.Root>
  <Card.Header class="pb-3">
    <Card.Title>
      {#if !sent}
        Consultar reservas
      {:else}
        Hola, {orders?.[0].name}
      {/if}
    </Card.Title>

    <Card.Description>
      {#if !sent}
        Ingresa tu celular para ver tus reservas.
      {:else}
        A continuación se listan tus pedidos:
      {/if}
    </Card.Description>
  </Card.Header>

  <Card.Content class="space-y-2">
    {#if !sent}
      <form
        on:submit|preventDefault={onConsult}
        class="flex flex-col space-y-6"
      >
        <div class="space-y-1">
          <Label for="cellphone">Celular</Label>
          <PhoneInput name="cellphone" id="cellphone" placeholder="xxxx xxxx" />
          <FieldError2 name="cellphone" {errors} />
        </div>

        <Button
          type="submit"
          disabled={loading}
          class="flex items-center self-start"
        >
          {#if loading}
            <RotateCcw class="mr-2 h-4 w-4 animate-spin" />
          {/if}

          Consultar
        </Button>
      </form>
    {:else}
      <!-- TODO: add success screen -->

      {#if orders}
        <div class="flex flex-col space-y-2">
          <article class="text-md my-3 flex flex-col space-y-3">
            {#each orders as order (order.id)}
              <FoodItem {order} {price} />
            {/each}
          </article>

          <hr />

          <div
            class="flex justify-between pb-4 pt-2 text-right text-lg leading-none"
          >
            <div class="font-semibold">Total:</div>
            <div class="font-normal">{getItemsTotal(orders, price)}</div>
          </div>
        </div>
      {/if}

      <Button on:click={resetForm}>
        <ArrowLeft class="mr-2 h-4 w-4" />
        Consultar nuevo
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
