<script lang="ts">
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  import { cn } from "$lib/utils";
  import type { ClassValue } from "clsx";

  // props
  let className: ClassValue = "";
  export { className as class };
</script>

<div class={cn("flex items-center justify-center", className)}>
  <div class="h-44 overflow-hidden">
    <LottiePlayer
      src="/lottie/error.json"
      autoplay={true}
      loop={false}
      controls={false}
      renderer="svg"
      background="transparent"
      height={250}
      width={250}
      style="margin-top: -50px"
    />
  </div>
</div>
