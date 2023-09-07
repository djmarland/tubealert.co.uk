import DI, { AppEnv } from "../../src/services/DI";

export const onRequestPost: PagesFunction<AppEnv> = async ({
  env,
  request,
}) => {
  const di = new DI(env);
  const key = await request.text();

  if (!key || key !== env.KEY) {
    return new Response("Not authorised", {
      status: 403,
    });
  }

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
