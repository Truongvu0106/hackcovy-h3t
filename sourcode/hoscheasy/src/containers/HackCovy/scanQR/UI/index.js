import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import I18n from 'react-native-i18n';
import { withThemes, appStyleNoNavBar } from 'Root/src/themes';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';
import MarkOnCamera from './mark';

@withThemes
export default class TakeCareScanner extends React.Component {
  handleError(error) {
    console.log({
      error
    });
  }

  onClickHistory = () => {
    this.props.navigator.push({
      screen: 'takeCareHistory',
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
    });
    this.props.goOut();
  };

  render() {
    const propsToPath = isIOS
      ? { onBarCodeRead: this.props.onBarCodeCanReadIOS }
      : { onBarCodeRead: this.props.onBarCodeCanReadAndroid };

    return (
      <View cls="flx-i bg-white width-100% height-100%">
        {this.props.isFocusScreen ? (
          <RNCamera
            onMountError={(error) => this.handleError(error)}
            cls="flx-i width-100% height-100%"
            autoFocus={RNCamera.Constants.AutoFocus.on}
            {...propsToPath}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            notAuthorizedView={
              <View style={styles.haa}>
                <Text style={{ fontSize: 16 }}>
                  We can not access your camera to scan QRCode
                </Text>
              </View>
            }
          >
            <MarkOnCamera onClickHistory={this.onClickHistory} />
          </RNCamera>
        ) : (
          <View cls="flx-i bg-blackMunt jcc aic">
            <Text cls="white ff-regular">Initializating camera</Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  haa: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
