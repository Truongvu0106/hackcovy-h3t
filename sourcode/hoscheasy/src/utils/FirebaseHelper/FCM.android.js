import firebase from 'react-native-firebase';
import configs from 'Root/src/configs/api';

const fcm = firebase.app().messaging();
fcm.subscribeToTopic(configs.TOPIC_FIREBASE);
export default fcm;
