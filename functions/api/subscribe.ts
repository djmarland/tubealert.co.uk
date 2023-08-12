import DI, { AppEnv } from "../../src/services/DI";

export const onRequestPost: PagesFunction<AppEnv> = async (context) => {
  const di = new DI(context.env);
  console.log(context.data);
  //   await di.getSubscriptions().setSubscriptions();
  return new Response(null, {
    status: 204,
  });
};
