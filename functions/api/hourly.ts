import DI, { AppEnv } from "../../src/services/DI";

export const onRequest: PagesFunction<AppEnv> = async ({ env }) => {
  const di = new DI(env);
  const disruptedStatuses = await di.getTFL().getDisrupted();

  if (disruptedStatuses?.length) {
    console.log(disruptedStatuses.length + " lines disrupted");
    await Promise.allSettled(
      disruptedStatuses.map((status) =>
        di.getSubscriptions().notifyHourlyUsers(status, di.getDateTime()),
      ),
    );
  } else {
    console.log("No lines with disrupted statuses");
  }

  return new Response(null, {
    status: 204,
  });
};
