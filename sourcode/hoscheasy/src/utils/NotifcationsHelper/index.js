import { Platform } from "react-native";
import firebase from "react-native-firebase";
import type {
  RemoteMessage,
  Notification,
  NotificationOpen
} from "react-native-firebase";

// for android >8 --> android register chanel to show
function initSetUp() {
  const channel = new firebase.notifications.Android.Channel(
    "Mytelpay_CSE",
    "MytelPay App Group",
    firebase.notifications.Android.Importance.Max
  ).setDescription("MytelPay App Group");
  firebase.notifications().android.createChannel(channel);
}

function pushInAppNotification(notification: Notification, badge) {
  if (Platform.OS === "ios") {
    console.log("notification ccc in app", notification);

    const noti = new firebase.notifications.Notification()
      .setNotificationId("thanhpcc12938837")
      .setTitle(notification.title)
      .setBody(notification.body)
      .setSound("default")
      .setData(notification.data || {});
    badge && firebase.notifications().setBadge(badge);
    firebase
      .notifications()
      .displayNotification(noti)
      .catch(e => console.log("Push notification ios error => ", e));
  } else {
    console.log("push push => ", notification);

    const noti = new firebase.notifications.Notification()
      .setNotificationId("thanhpcc12938837")
      .setTitle(notification.title)
      .setBody(notification.body)
      .setSound("default")
      .setData(notification.data)
      .android.setAutoCancel(true)
      .android.setPriority(1)
      .android.setVibrate(3)
      .android.setChannelId("Mytelpay_CSE")
      // .android.setSmallIcon('ic_launcher')
      .android.setSmallIcon("ic_stat_notification_icon")
      .android.setLargeIcon("ic_launcher")
      .android.setPriority(firebase.notifications.Android.Priority.High);
    badge && firebase.notifications().setBadge(badge);
    firebase
      .notifications()
      .displayNotification(noti)
      .then(ok => console.log("push ok => ", ok))
      .catch(err => console.log("Push notification ios error => ", err));
  }
}
function pushInAppNotificationWithMessage(message: RemoteMessage, badge) {
  if (Platform.OS === "ios") {
    const noti = new firebase.notifications.Notification()
      .setNotificationId("thanhpcc12938837")
      .setTitle(message.data.title)
      .setBody(message.data.body)
      .setSound("default")
      .setData(message.data || {});
    badge && firebase.notifications().setBadge(badge);
    firebase
      .notifications()
      .displayNotification(noti)
      .catch(e => console.log("Push notification ios error => ", e));
  } else {
    const noti = new firebase.notifications.Notification()
      .setNotificationId("thanhpcc12938837")
      .setTitle(message.data.title)
      .setBody(message.data.body)
      .setSound("default")
      .setData(message.data)
      .android.setAutoCancel(true)
      .android.setPriority(1)
      .android.setVibrate(3)
      .android.setChannelId("Mytelpay_CSE")
      // .android.setSmallIcon('ic_launcher')
      .android.setSmallIcon("ic_stat_notification_icon")
      .android.setLargeIcon("ic_launcher")
      .android.setPriority(firebase.notifications.Android.Priority.High);
    badge && firebase.notifications().setBadge(badge);
    firebase
      .notifications()
      .displayNotification(noti)
      .then(ok => console.log("push ok => ", ok))
      .catch(err => console.log("Push notification ios error => ", err));
  }
}

export default {
  initSetUp,
  pushInAppNotification,
  pushInAppNotificationWithMessage
};
