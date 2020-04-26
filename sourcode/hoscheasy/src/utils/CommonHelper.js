import { Platform, Linking, Alert } from 'react-native';
import I18n from 'react-native-i18n';

export function showDialogUpdateApp() {
  Alert.alert(
    I18n.t('message'),
    I18n.t('99997'),
    [
      {
        text: 'Update now',
        onPress: () => {
          if (Platform.OS === "ios") {
            Linking.openURL(
              `https://itunes.apple.com/us/app/mytelpay-cse/id1455962782`
            );
          } else {
            Linking.openURL(
              `https://play.google.com/store/apps/details?id=com.mytelpay.cse`
            );
          }
        }
      }
    ],
    { cancelable: false }
  );
}
