import React, { Component } from "react";
import { Text, View,AsyncStorage } from "react-native";
import type {
  RemoteMessage,
  Notification,
  NotificationOpen
} from "react-native-firebase";
import firebase from "react-native-firebase";
import NotifyHelper from 'Root/src/utils/NotifcationsHelper';

export default class FirebaseNotify extends Component {
  componentDidMount() {
    this.checkPermission();
    const { navigator } = this.props;
    //----------------------------------
    //Config + Handler Firebase

    // subcriber Topic Firebase
    firebase.messaging().subscribeToTopic("topic_default_cse");

    //---------------------
    this.messageListener = firebase
      .messaging()
      .onMessage((message: RemoteMessage) => {
        console.log('123')
        console.log('message',message)
        // Cũng lắng nghe notification được push từ hệ thống nhưng với key data
        NotifyHelper.pushNotificationWithMessage(message, 1);
      });
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
        console.log('message',notification)
        console.log('456')
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        console.log('789')
        // Process your notification as required
        // với key là notification
        // lắng nghe có notification push từ hệ thống về và đẩy lên app
        NotifyHelper.pushNotificationWithNotification(notification, 3);
      });
    // nhận sự kiện khi user click vào notifi: App đang mở
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        console.log('123456')
        NotifyHelper.handlerNotification(notificationOpen);
      });
    // nhận sự kiện khi user click vào notifi: App ẩn hoặc đang đóng
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        console.log('123456789')
        if (notificationOpen) {
          NotifyHelper.handlerNotification(notificationOpen);
        }
      });
    //-----------------End Firebase----------------------------------------------------
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('ENABLED',enabled);
    if (enabled) {
      console.log('ENABLED lay token');
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken',fcmToken)
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        console.log('fcmToken',fcmToken)
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  render() {
    return (
     null
    );
  }
}
