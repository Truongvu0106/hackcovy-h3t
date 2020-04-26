import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import SafeArea from 'Root/src/components/SafeAreaView';
import { withThemes, appStyleNoNavBar, colors } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import { authLogout } from 'Root/src/store/actions/auth';
import CustomNavbar from 'Root/src/components/HeaderCustom';
import ModalGuide from 'Root/src/components/ModalGuide';

@connect((_) => ({ profile: _.auth.profile, locale: _.locale }), {
  authLogout
})
@withThemes
export default class TabMore extends React.Component {
  static navigatorStyle = appStyleNoNavBar;
  state = {
    isShowModal: false
  };

  _goScreen(screen: string, passProps = {}) {
    this.props.navigator.push({
      screen,
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true },
      passProps
    });
  }

  render() {
    return (
      <SafeArea gradient>
        <CustomNavbar title="yourQR" {...this.props} />
        <View cls="flx-i bg-whiteBold p-10 jcc aic">
          <View style={styles.card}>
            <Image source={images.img_myqr} cls="width-250 height-250" />
          </View>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#999999',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
