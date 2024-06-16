export const cookiesToObj = <T = Record<string, any>>(cookie: string): T => {
  const cookieObj = cookie
    .split(";")
    .map((item: string) => item.split("="))
    .reduce(
      (acc: any, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc,
      {},
    );

  return cookieObj ?? {};
};
