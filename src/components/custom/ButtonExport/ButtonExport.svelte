<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { Toaster, toast } from "svelte-sonner";
  import { File } from "lucide-svelte/icons";

  // references
  let downloadAnchor: HTMLAnchorElement;

  const downloadPdf = async (): Promise<void> => {
    try {
      const response = await fetch("/api/export");

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
