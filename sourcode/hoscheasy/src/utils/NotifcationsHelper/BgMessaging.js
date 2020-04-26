// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
  // handle your message
  const noti = new firebase.notifications.Notification()
    .setNotificationId('gandalf')
    .setTitle(message.data.title)
    .setBody(message.data.body)
    .setSound('default')
    .setData({
      screen: message.data.screen,
      title: 'lolo'
    })
    .android.setAutoCancel(true)
    .android.setPriority(1)
    .android.setVibrate(3)
    .android.setChannelId('channelId')
    .android.setSmallIcon('ic_launcher');
  firebase.notifications().setBadge(1);
  firebase.notifications().displayNotification(noti);
  return Promise.resolve();
};
