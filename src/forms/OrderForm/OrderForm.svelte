<script lang="ts">
  import { onMount, tick } from "svelte";
  import { actions, isInputError } from "astro:actions";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";

  import {
    FoodView,
    FieldError,
    PhoneInput,
    CounterInput,
  } from "$lib/components/custom";

  import { RotateCcw, ArrowLeft } from "lucide-svelte/icons";
  import { orderSchema, type Order } from "$lib/validation";
  import type { ActionInputError } from "astro:actions";

  // references
  let formEl: HTMLFormElement | null;
  let lottiePlayer: LottiePlayer;

  onMount(() => {
    (formEl?.querySelector("#name") as HTMLInputElement | undefined)?.focus();
  });

  // states
  let loading: boolean = false;
  let sent: boolean = false;
  let success: boolean | null = null;
  let errors: ActionInputError<Order>["fields"] | null = null;
  let showLottie: boolean = false;

  // helpers
  const playLottie = (): void => {
    lottiePlayer.getLottie().addEventListener("complete", () => {
      showLottie = false;
    });
  };

  // handlers
  const onMakeOrder = async (e: SubmitEvent): Promise<void> => {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as Order;

    const { success: valid, error: validationErr } =
      orderSchema.safeParse(data);

    if (!valid) {
      errors = validationErr.flatten().fieldErrors;
      success = false;
      return;
    }

    loading = true;
    const { data: result, error } = await actions.order.safe(data);
    loading = false;

    if (error && isInputError(error)) {
      errors = error.fields;
      return;
    }

    errors = null;
    success = result === "success";
    sent = true;

    showLottie = true;
    await tick();
    playLottie();
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
        <p>
          {#if !sent || (sent && success === false)}
            Completa tus datos para reservar tu comida!
          {:else}
            Completado con éxito!
          {/if}
        </p>

        {#if !sent}
          <FoodView />
        {/if}
      </div>
    </Card.Description>
  </Card.Header>

  <Card.Content class="space-y-2">
    {#if !sent}
      <form
        bind:this={formEl}
        method="POST"
        on:submit|preventDefault={onMakeOrder}
        class="flex flex-col space-y-2"
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
      {#if success === true}
        <div class="-mt-4 flex justify-center">
          {#if showLottie}
            <LottiePlayer
              bind:this={lottiePlayer}
              autoplay
              loop={false}
              src="/lottie/check.json"
              controls={false}
              renderer="svg"
              background="transparent"
              width={250}
              height={250}
            />
          {:else}
            <div class="w-full pb-4 pt-3 text-lg text-accent-foreground">
              Gracias por reservar con nosotros ❤️
            </div>
          {/if}
        </div>
      {:else}
        <div>Ups!</div>
      {/if}

      <Button on:click={resetForm}>
        <ArrowLeft class="mr-2 h-4 w-4" />
        Pedir nuevo
      </Button>
    {/if}
  </Card.Content>
</Card.Root>
