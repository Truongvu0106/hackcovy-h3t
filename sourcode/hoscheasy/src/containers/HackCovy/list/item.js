import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { withThemes, appStyleNoNavBar } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import I18n from 'react-native-i18n';
import { deviceHeight, deviceWidth } from 'Root/src/utils/UIHelper';

@withThemes
export default class Item extends Component {
  render() {
    const { item, navigator } = this.props;

    if (item && item.isSpecial) {
      return (
        <View cls='flx-i aifs jcc height-40 pl-16 mt-5'>
          <Text cls='f-16 gray'>{item && I18n.t(item.title)}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigator && navigator.push({
            screen: 'agentDetail',
            passProps: {
              agentInfo: item
            },
            animationType: 'none',
            navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
          });
        }}
        cls="width-100%"
      >
        <View cls="width-100% flx-row aic">
          <View cls="width-70 aic jcc pv-10">
            <Image source={images.avatar} cls='width-42 height-42' />
          </View>
          <View cls="flx-i bbhl bd-placeHolder">
            <View cls="flx-i jcc pv-10">
              <View cls='flx-row aic'>
                <Text cls="f-16 fw4" style={{ maxWidth: item.ACCOUNT_STATE_NAME.toString().length <= 6 ? deviceWidth - 150 : deviceWidth - 170 }} numberOfLines={1}>{item && item.LAST_NAME}</Text>
                <View cls={['width-8 height-8 bdRadius-4 ml-10', (item && item.ACCOUNT_STATE_ID === 1) ? 'bg-green' : 'bg-red']} />
                <Text
                  cls={['green f-10 ml-4', (item && item.ACCOUNT_STATE_ID === 1) ? 'green' : 'red']}
                  style={{ maxWidth: (item && item.LAST_NAME.toString().length >= 25) ? 70 : null }}
                  numberOfLines={1}
                >{item && item.ACCOUNT_STATE_NAME}</Text>
              </View>
              <View cls='flx-row aic'>
                <Text cls="f-14 gray">{item && item.MSISDN}</Text>
                <View cls='flx-i flx-row jcfe pr-12'>
                  <Text cls={['f-16 fw4', (item && item.LIQUIDITY && item.LIQUIDITY === 2) ? '' : 'red']}>{item && item.BALANCE}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
