<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="w-full max-w-[400px]">
  <Card.Header>
    <Card.Title class="text-2xl">Administrador</Card.Title>
    <Card.Description
      >Ingresa tu correo y contraseña para acceder.</Card.Description
    >
  </Card.Header>

  <Card.Content class="grid gap-4">
    <div class="grid gap-2">
      <Label for="email">Email</Label>
      <Input id="email" type="email" placeholder="juanito@email.com" required />
    </div>

    <div class="grid gap-2">
      <Label for="password">Contraseña</Label>
      <Input id="password" type="password" required />
    </div>
  </Card.Content>

  <Card.Footer>
    <Button
      class="w-full"
      on:click={() => (window.location.href = "/admin/dashboard")}
      >Entrar</Button
    >
  </Card.Footer>
</Card.Root>