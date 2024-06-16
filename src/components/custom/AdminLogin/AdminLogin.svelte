<script lang="ts">
  import { navigate } from "astro:transitions/client";
  import { actions, isInputError } from "astro:actions";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { FieldError } from "$lib/components/custom";
  import { loginSchema } from "$lib/validation";
  import { app } from "$lib/stores";
  import { RotateCcw } from "lucide-svelte/icons";
  import { translate } from "$lib/helpers";
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
    errors = null;

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as Login;

    const { success: valid, error: validationErr } =
      loginSchema.safeParse(data);

    if (!valid) {
      errors = validationErr.flatten().fieldErrors;
      return;
    }

    loading = true;
    const { data: result, error: loginErr } = await actions.login.safe(data);

    if (loginErr && isInputError(loginErr)) {
      errors = loginErr.fields;
      loading = false;
      return;
    }

    const { user, error } = result as LoginResponse;

    if (!user || error) {
      loading = false;
      errors = { email: [translate(error as string)] };
      return;
    }

    $app.user = user;
    errors = null;
    success = sent = true;

    navigate("/admin/dashboard");
  };
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
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="contraseña"
        />
        <FieldError {errors} name="password" />
      </div>

      <div class="pt-2">
        <Button type="submit" class="w-full" disabled={loading}>
          {#if loading}
            <RotateCcw class="mr-2 h-4 w-4 animate-spin" />
          {/if}

          Entrar
        </Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
