<script lang="ts">
  import { Toaster, toast } from "svelte-sonner";
  import Button from "$lib/components/ui/button/button.svelte";
  import { cookiesToObj } from "$lib/utils/cookies";
  import { File } from "lucide-svelte/icons";
  import type { Session } from "@supabase/supabase-js";

  // references
  let downloadAnchor: HTMLAnchorElement;

  const downloadPdf = async (): Promise<void> => {
    const { access_token } = cookiesToObj<Pick<Session, "access_token">>(
      document.cookie,
    );

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        body: JSON.stringify({ access_token }),
      });

      if (response.status !== 200) {
        const { error } = await response.json();

        toast.error("Exportar lista", {
          description: "Lo sentimos, ha habido un problema.",
        });

        console.log(error?.message);
        return;
      }

      const pdf = await response.blob();
      const download = window.URL.createObjectURL(pdf);

      downloadAnchor.href = download;
      downloadAnchor.download = "lista.pdf";
      downloadAnchor.click();
    } catch (e: any) {
      toast.error("Exportar lista", {
        description: "Lo sentimos, ha habido un error.",
      });

      console.log(e);
    }
  };
</script>

<Button size="sm" class="h-7 gap-1" on:click={downloadPdf}>
  <File class="h-3.5 w-3.5" />
  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Exportar </span>
</Button>

<Toaster position="top-right" />
<a class="hidden" bind:this={downloadAnchor} href="#download">.</a>
