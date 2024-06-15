<script lang="ts">
  import { navigate } from "astro:transitions/client";
  import { tick } from "svelte";
  import { actions, isInputError } from "astro:actions";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { FieldError } from "$lib/components/custom";
  import { loginSchema } from "$lib/validation";
  import { app } from "$lib/stores";
  import type { ActionInputError } from "astro:actions";
  import type { Login } from "$lib/validation";
  import type { LoginResponse } from "$lib/types";

  // states
  let loading: boolean = false;
  let sent: boolean = false;
  let success: boolean | null = null;
  let errors: ActionInputError<Login>["fields"] | null = null;

  // handlers
  const handleLogin = async (e: SubmitEvent): Promise<void> => {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as Login;

    const { success: valid, error: validationErr } =
      loginSchema.safeParse(data);

    if (!valid) {
      errors = validationErr.flatten().fieldErrors;
      return;
    }

    loading = true;
    const { data: result, error } = await actions.login.safe(data);
    loading = false;

    console.log({ result, error });

    if (error && isInputError(error)) {
      errors = error.fields;
      return;
    }

    // TODO: handle error cases properly
    const { user } = result as LoginResponse;
    $app.user = user;

    errors = null;
    success = sent = true;

    await tick();
    navigate("/admin/dashboard");
  };

  $: console.log({ $app });
</script>

<Card.Root class="w-full max-w-[400px]">
  <Card.Header>
    <Card.Title class="text-2xl">Iniciar sesión</Card.Title>
    <Card.Description>
      Ingresa tu correo y contraseña para acceder.
    </Card.Description>
  </Card.Header>

  <Card.Content class="grid gap-4">
    <form
      method="POST"
      on:submit|preventDefault={handleLogin}
      class="flex flex-col space-y-4"
      novalidate
    >
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="juanito@email.com"
        />
        <FieldError {errors} name="email" />
      </div>

      <div class="grid gap-2">
        <Label for="password">Contraseña</Label>
        <Input name="password" id="password" type="password" />
        <FieldError {errors} name="password" />
      </div>

      <div class="pt-2">
        <Button type="submit" class="w-full">Entrar</Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
