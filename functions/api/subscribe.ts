import DI, { AppEnv } from "../../src/services/DI";

export const onRequestPost: PagesFunction<AppEnv> = async ({
  env,
  request,
}) => {
  const di = new DI(env);
  const data = await request.json();

  if (data?.userID && data?.lineID && data?.timeSlots && data?.subscription) {
    await di
      .getSubscriptions()
      .setSubscriptions(
        data.userID,
        data.lineID,
        data.timeSlots,
        data.subscription,
      );
  }
  return new Response(null, {
    status: 204,
  });
};
