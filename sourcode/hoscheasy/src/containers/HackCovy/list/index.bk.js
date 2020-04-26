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
import { withThemes, appStyleNoNavBar } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import { authLogout } from 'Root/src/store/actions/auth';
import CustomNavbar from 'Root/src/components/HeaderCustom';
import options from './options';
// import NotifiUpdate from "./Notifiupdate";

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

  renderRow(it, id) {
    const content = (
      <TouchableOpacity
        key={id}
        style={styles.card}
        cls="m-4"
        onPress={() => {}}
      >
        <View cls="flx-i">
          <View cls="flx-row jcsb height-60">
            <View cls="width-75%">
              <Text cls="f-24 b">{it && it.nameRoom}</Text>
              <View cls="flx-row aic">
                <Image source={images.clock} cls="width-12 height-12" resizeMode="contain" />
                <Text cls="mt-4 ml-6 f-13 newText">Dự kiến mất: {it && it.time}</Text>
              </View>
            </View>
            <View cls="width-25% aic">
              <Image source={it && it.imageDoctor} cls="width-56 height-56" resizeMode="contain" />
            </View>
          </View>

          <View cls="flx-row jcsb height-20">
            <View cls="width-75%">
              <View cls="flx-row aic">
                <Image source={images.place} cls="width-13 height-13" resizeMode="contain" />
                <Text cls="newText ml-6">{it && it.address}</Text>
              </View>
            </View>
            <View cls="width-25% aic">
              <Text cls="">{it && it.nameDoctor}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return content;
  }

  render() {
    return (
      <SafeArea gradient>
        <CustomNavbar title="shedule" {...this.props} />
        <View cls="flx-i bg-whiteBold p-10">
          <ScrollView>
            {options.map((it, id) => this.renderRow(it, id))}
          </ScrollView>
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
    alignItems: 'center',
    padding: 8
  }
});
