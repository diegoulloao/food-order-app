/* import ArrowDown from "svelte-radix/ArrowDown.svelte";
import ArrowRight from "svelte-radix/ArrowRight.svelte";
import ArrowUp from "svelte-radix/ArrowUp.svelte";
import CheckCircled from "svelte-radix/CheckCircled.svelte";
import Circle from "svelte-radix/Circle.svelte";
import CrossCircled from "svelte-radix/CrossCircled.svelte";
import QuestionMarkCircled from "svelte-radix/QuestionMarkCircled.svelte";
import Stopwatch from "svelte-radix/Stopwatch.svelte"; */

export const statuses = [
  {
    value: "pending",
    label: "Pendiente",
    // icon: QuestionMarkCircled,
  },
  {
    value: "entregado",
    label: "Entregado",
    // icon: CheckCircled,
  },
  {
    value: "cancelled",
    label: "Cancelado",
    // icon: CrossCircled,
  },
];
