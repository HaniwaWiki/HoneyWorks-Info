export type NotificationOptions = globalThis.NotificationOptions;

export function sendNotification(title: string, options: NotificationOptions) {
  Notification.requestPermission((result) => {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    }
  });
}
