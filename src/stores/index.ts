import { writable } from "svelte/store";
import type { AppStore } from "$lib/types/stores";

export const app = writable<AppStore>({
  user: null,
});
