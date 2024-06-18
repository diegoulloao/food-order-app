import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config

export default defineConfig({
  output: "hybrid",
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  adapter: vercel({
    includeFiles: [
      "./src/factory/pdf/resources/fonts/Roboto-Bold.ttf",
      "./src/factory/pdf/resources/fonts/Roboto-Regular.ttf",
      "./src/factory/pdf/resources/fonts/Roboto-Italic.ttf",
      "./src/factory/pdf/resources/fonts/Roboto-BoldItalic.ttf",
    ],
  }),
  experimental: {
    actions: true,
  },
});
