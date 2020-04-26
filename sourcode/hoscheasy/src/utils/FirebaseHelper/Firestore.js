import firebase from 'react-native-firebase';

const firestore = firebase.app().firestore();

firestore.settings({
  persistence: false
});

export default firestore;
