import { createSignal } from "solid-js";
import { isSupported } from "../utils/pushManger";
import { ActivePagePanel } from "./ActivePage";
import { Button } from "./Button";
import { createStoredSignal } from "../utils/createStoredSignal";
import { SUBSCRIPTION_DATA_LOCALSTORAGE_KEY } from "../services/Subscriptions";
import { Subscriptions } from "./Subscription";

export const Settings = () => {
  return (
    <ActivePagePanel title="Settings">
      <h2 class="text-lg">Notifications</h2>
      <Unsubscribe />
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

const STATUS_TEXT =
  "You can delete all of your subscriptions here. You will no longer receive notifications on this device.";

export const Unsubscribe = () => {
  if (!isSupported) {
    return (
      <p>
        <strong>
          Your browser does not support push notifications for disruption
          alerts.
        </strong>
      </p>
    );
  }

  const [status, setStatus] = createSignal<string>(STATUS_TEXT);
  const [, , remove] = createStoredSignal<Subscriptions>(
    SUBSCRIPTION_DATA_LOCALSTORAGE_KEY,
    {},
  );

  const unsubscribe = (evt: SubmitEvent) => {
    evt.preventDefault();
    if (!window.confirm("Are you sure? This cannot be undone.")) {
      return;
    }

    setStatus("Saving…");
    window.navigator.serviceWorker.ready
      .then((serviceWorkerRegistration) =>
        serviceWorkerRegistration.pushManager.getSubscription(),
      )
      .then((subscription) => {
        if (subscription) {
          const postData = {
            userID: subscription.endpoint,
          };
          subscription.unsubscribe();
          return fetch("/api/unsubscribe", {
            method: "post",
            body: JSON.stringify(postData),
          });
        }
      })
      .then(() => {
        remove();
        setStatus("Successfully unsubscribed ✅");
      })
      .catch((e) => {
        window.alert(e);
      })
      .finally(() => {
        window.setTimeout(() => {
          setStatus(STATUS_TEXT);
        }, 3000);
      });
  };

  return (
    <form onSubmit={unsubscribe}>
      <p class="mb-1">{status()}</p>
      {status() === STATUS_TEXT && <Button>Unsubscribe</Button>}
    </form>
  );
};
