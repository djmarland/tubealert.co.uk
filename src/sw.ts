import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("push", (event) => {
  if (!event.data) {
    return; // dummy notification, used to update the service worker where possible
  }
  const data = event.data.json();
  const title = data.title;

  event.waitUntil(self.registration.showNotification(title, data));
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();

  // This looks to see if the target path is already open and
  // focuses if it is
  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i += 1) {
          const client = clientList[i];
          const url = client.url;
          const parts = url.split("/");
          const path = `/${parts[parts.length - 1]}`;
          if (path === event.notification.tag && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(event.notification.tag);
        }
        return null;
      }),
  );
});
