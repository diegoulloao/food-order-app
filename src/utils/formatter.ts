export const dateTime = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Santiago",
});

export const currency = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});
