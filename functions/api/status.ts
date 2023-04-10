const fetchData = async (appID, appKey) => {
  const url =
    "https://api.tfl.gov.uk/Line/Mode/tube,dlr,elizabeth-line,overground/Status" +
    `?app_id=${appID}` +
    `&app_key=${appKey}`;

  console.log("Fetching data from " + url);
  const data = await fetch(url).then((d) => d.json());
  console.log("JSON received");
  return JSON.stringify(data);
};

interface Env {
  TFL_APP_ID: string;
  TFL_APP_KEY: string;
  // KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // const value = await context.env.KV.get('example');
  return new Response(
    await fetchData(context.env.TFL_APP_ID, context.env.TFL_APP_KEY)
  );
};
