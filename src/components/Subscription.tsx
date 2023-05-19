import { Component } from "solid-js";

export const Subscription: Component<{ lineKey: string }> = (props) => {
  const isSupported =
    typeof window !== "undefined" &&
    "navigator" in window &&
    "serviceWorker" in window.navigator &&
    "PushManager" in window;

  if (!isSupported) {
    return (
      <p>
        <strong>Your browser does not support push notifications.</strong>
      </p>
    );
  }

  return (
    <details>
      <summary>Subscribe for alerts {props.lineKey}</summary>
      <div>
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
        Yo it goes in here. <br />
      </div>
    </details>
  );
};
