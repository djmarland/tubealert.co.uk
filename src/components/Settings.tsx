import { ActivePagePanel } from "./ActivePage";

export const Settings = () => {
  return (
    <ActivePagePanel title="Settings">
      <h2 class="text-lg">Notifications</h2>
      <p>
        You can delete all of your subscriptions here. You will no longer
        receive notifications.
      </p>
      <hr />
      <h2 class="text-lg">About</h2>
      <p>
        Powered by TfL Open Data. <br />
        Built by{" "}
        <a href="https://rland.me.uk" target="_blank" class="underline">
          David Marland
        </a>
      </p>
    </ActivePagePanel>
  );
};
