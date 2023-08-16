import DI, { AppEnv } from "../../src/services/DI";

export const onRequest: PagesFunction<AppEnv> = async ({ env }) => {
  const di = new DI(env);
  const disruptedStatuses = await di.getTFL().updateAndCheckStatus();

  if (disruptedStatuses?.length) {
    console.log(disruptedStatuses.length + " lines disrupted");
    await Promise.allSettled(
      disruptedStatuses.map((status) =>
        di.getSubscriptions().notifyUsers(status),
      ),
    );
  } else {
    console.log("No lines with changed statuses");
  }

  return new Response(null, {
    status: 204,
  });
};
