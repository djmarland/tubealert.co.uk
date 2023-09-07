import DI, { AppEnv } from "../../src/services/DI";

export const onRequestPost: PagesFunction<AppEnv> = async ({
  env,
  request,
}) => {
  const di = new DI(env);
  const data = await request.json();

  if (data?.userID) {
    await di.getSubscriptions().removeSubscriptions(data.userID);
  }
  return new Response(null, {
    status: 204,
  });
};
