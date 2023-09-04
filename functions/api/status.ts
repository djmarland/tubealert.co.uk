import DI, { AppEnv } from "../../src/services/DI";

export const onRequest: PagesFunction<AppEnv> = async ({ env }) => {
  const di = new DI(env);
  const content = JSON.stringify(await di.getTFL().getCurrentStatus());

  const impl = await (typeof globalThis !== "undefined" &&
  (globalThis as any).crypto
    ? (globalThis as any).crypto
    : import("node:crypto"));

  console.log(impl);

  return new Response(content, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": String(content.length),
      "Cache-Control": "public, max-age=60",
    },
  });
};
