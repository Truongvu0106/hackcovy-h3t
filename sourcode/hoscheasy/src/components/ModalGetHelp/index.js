import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import { withThemes } from 'Root/src/themes';
import { deviceWidth } from 'Root/src/utils/UIHelper';

const getHelps = [
  {
    text: 'hotlineMytel',
    type: 'agent',
    phone: '999',
    phoneText: '999'
  },
  {
    text: 'hotlineOffnet',
    type: 'customer',
    phone: '09688000999',
    phoneText: '09688000999'
  }
];

type Props = {
  isVisibale: boolean,
  onClose: () => void
};

@withThemes
export default class ModalGetHelp extends React.Component<Props> {
  handleCall(item) {
    Linking.canOpenURL(`tel:${item.phone}`)
      .then(suported => {
        if (suported) {
          Linking.openURL(`tel:${item.phone}`);
          return;
        }
        Alert.alert(I18n.t('canNotCall'), I18n.t('yourPhoneHaveSomeProblemToCall'));
      })
      .catch(e => {
        console.log('error ==> ', e);
        Alert.alert(I18n.t('canNotCall'), I18n.t('yourPhoneHaveSomeProblemToCall'));
      });
  }
  render() {
    const { isVisibale, onClose } = this.props;
    return (
      <Modal
        isVisible={isVisibale}
        hideModalContentWhileAnimating
        useNativeDriver
        cls="jcc aic flx-i m-0"
        onBackdropPress={() => onClose()}
        backdropColor="rgba(0,0,0,0.4)"
      >
        <View cls={`width-${deviceWidth * 0.8} bg-white bdRadius-10 pb-16`}>
          <View cls="width-100% pv-6 aic bbhl bd-border">
            <Text cls="f-16 ff-medium fw5">{I18n.t('helpService')}</Text>
          </View>
          {getHelps.map((item, id) => (
            <View cls="flx-row ph-16 pv-8 jcsb aic mt-8" key={id}>
              <View>
                <Text cls="ff-regular f-16" style={{ maxWidth: 170 }} numberOfLines={2}>{I18n.t(item.text)}</Text>
                <Text cls="ff-regular f-13 mt-4 ml-8 note">
                  {item.phoneText}
                </Text>
              </View>
              <TouchableOpacity
                cls="ph-16 pv-4 bg-newStartGradientNav bdRadius-5"
                onPress={() => this.handleCall(item)}
              >
                <Text cls="ff-regular f-16 white">{I18n.t('call')}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Modal>
    );
  }
}
