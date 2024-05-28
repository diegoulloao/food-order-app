<script lang="ts">
  import { onMount } from "svelte";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";

  import {
    FoodView,
    FieldError,
    PhoneInput,
    CounterInput,
  } from "$lib/components/custom";

  import { RotateCcw, ArrowLeft } from "lucide-svelte/icons";
  import { createOrder } from "$lib/fetch";
  import { orderSchema, type Order } from "$lib/validation";
  import type { ZodFormattedError } from "zod";

  // references
  let formEl: HTMLFormElement | null = null;

  onMount(() => {
    (formEl?.querySelector("#name") as HTMLInputElement | undefined)?.focus();
  });

  // states
  let loading: boolean = false;
  let sent: boolean = false;
  let success: boolean | null = null;
  let errors: ZodFormattedError<Order> | null = null;

  // handlers
  const onMakeOrder = async (e: SubmitEvent): Promise<void> => {
    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData) as Order;
    const { error } = orderSchema.safeParse(data);

    if (error) {
      errors = error.format();
      success = false;
      return;
    }

    errors = null;
    loading = true;
    const result = await createOrder(data);
    loading = false;

    success = result.status === 202;
    sent = true;
  };

  const resetForm = (): void => {
    success = null;
    sent = false;
  };
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Reservar plato</Card.Title>
    <Card.Description>
      <div class="flex flex-col space-y-5">
        <p>Completa tus datos para reservar tu comida!</p>
        <FoodView />
      </div>
    </Card.Description>
  </Card.Header>

  <Card.Content class="space-y-2">
    {#if !sent}
      <form
        bind:this={formEl}
        class="flex flex-col space-y-2"
        on:submit|preventDefault={onMakeOrder}
      >
        <div class="space-y-1">
          <Label for="name">Nombre</Label>

          <Input
            name="name"
            id="name"
            placeholder="Ej. Juanito Pérez"
            data-1p-ignore
          />
          <FieldError {errors} name="name" />
        </div>

        <div class="space-y-1">
          <Label for="cellphone">Celular</Label>
          <PhoneInput name="cellphone" id="cellphone" placeholder="xxxx xxxx" />
          <FieldError {errors} name="cellphone" />
        </div>

        <!-- <div class="space-y-1">
          <Label for="address">Dirección</Label>
          <Input data-1p-ignore name="address" id="address" />
          <FieldError {errors} name="address" />
        </div> -->

        <div class="space-y-1">
          <Label for="amount">Cantidad</Label>

          <CounterInput
            name="amount"
            id="amount"
            type="number"
            min="1"
            max="10"
          />

          <FieldError {errors} name="amount" />
        </div>

        <div class="pt-5">
          <Button type="submit" disabled={loading} class="flex items-center">
            {#if loading}
              <RotateCcw class="mr-2 h-4 w-4 animate-spin" />
            {/if}

            Hacer pedido
          </Button>
        </div>
      </form>
    {:else}
      <!-- TODO: add success screen -->
      <div>Enviado!</div>

      <Button on:click={resetForm}>
        <ArrowLeft class="mr-2 h-4 w-4" />
        Pedir nuevo
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
