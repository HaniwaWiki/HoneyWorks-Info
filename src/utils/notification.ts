export type NotificationOptions = globalThis.NotificationOptions;

// fixme: new Notification() is not supported in Safari and Chrome Android
//  need to switch to Service Worker
//  https://stackoverflow.com/questions/31512504/html5-notification-not-working-in-mobile-chrome
export function sendNotification(title: string, options: NotificationOptions) {
  return new Notification(title, options);
}

Notification.requestPermission();
