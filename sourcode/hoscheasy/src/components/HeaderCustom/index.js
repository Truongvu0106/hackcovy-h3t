import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'Root/src/elements/Icon';
import LinearGradient from 'react-native-linear-gradient';
import I18n from 'react-native-i18n';
import { withThemes, colors,appStyleNoNavBar } from 'Root/src/themes';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';

type Props = {
  textSize?: number,
  isHome: boolean,
  title?: string,
  navigator?: Function,
  containerStyle?: Object
};

@withThemes
export default class CustomNavbar extends PureComponent<Props> {
  props: Props;
  static defaultProps = {
    isHome: false
  };

  renderHeader() {
    const { isHome, title, navigator } = this.props;
    const navBarButton = {
      'width-56 height-56': !isIOS,
      'width-44 height-44': isIOS
    };
    const navBar = {
      'height-56': !isIOS,
      'height-44': isIOS
    };
    if (isHome) {
      return (
        <View cls={['flx-row width-100% aic', navBar]}>
          <TouchableOpacity
            cls={['aic jcc asc', navBarButton]}
            // onPress={() => navigator.pop()}
          >
            {/* <Icon name="" size={25} color={colors.white} /> */}
          </TouchableOpacity>
          <View cls="flx-i jcc aic">
            <Text cls="f-17 ff-medium white">{title ? I18n.t(title) : ''}</Text>
          </View>
          <View cls={['aic jcc asc', navBarButton]} />
        </View>
      );
    }
    return (
      <View cls={['flx-row width-100% aic', navBar]}>
        <TouchableOpacity
          cls={['aic jcc asc', navBarButton]}
          onPress={() => navigator.pop()}
        >
          <Icon name="ios-arrow-round-back" size={35} color={colors.white} />
        </TouchableOpacity>
        <View cls="flx-i jcc aic">
          <Text cls="f-17 ff-medium white">{title ? I18n.t(title) : ''}</Text>
        </View>
        <View cls={['aic jcc asc', navBarButton]} />
      </View>
    );
  }

  navigate = () => {
    this.props.navigator.push({
      screen: 'searchPlace',
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true },
    });
  }

  renderFindAgentHeader = () => {
    const { isTab, title, navigator } = this.props;
    const navBarButton = {
      "width-56 height-56": !isIOS,
      "width-44 height-44": isIOS
    };
    const navBar = {
      "height-56": !isIOS,
      "height-44": isIOS
    };
    if (isTab) {
      return (
        <View cls={["flx-row width-100% aic", navBar]}>
          <TouchableOpacity
            cls={["aic jcc asc", navBarButton]}
            onPress={() => navigator.pop()}
          >
            <Icon name="ios-arrow-round-back" size={35} color={colors.white} />
          </TouchableOpacity>
          <View cls="flx-i jcc aic">
            <Text cls="f-17 ff-medium white">{title ? I18n.t(title) : ""}</Text>
          </View>
          <TouchableOpacity cls={["aic jcc asc", navBarButton]} onPress={this.navigate}>
            <Icon name="ios-search" size={25} color="rgba(255, 255, 255, 0.5)" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View cls={["flx-row width-100% aic", navBar]}>
          <View
            cls={["aic jcc asc", navBarButton]}
            // onPress={() => navigator.pop()}
          >
            {/* <Icon name="" size={25} color={colors.white} /> */}
          </View>
          <View cls="flx-i jcc aic">
            <Text cls="f-17 ff-medium white">{title ? I18n.t(title) : ""}</Text>
          </View>
          <TouchableOpacity cls={["aic jcc asc", navBarButton]} onPress={this.navigate}>
            <Icon name="ios-search" size={25} color={"rgba(255, 255, 255, 0.5)"} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const { findAgentHeader } = this.props;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.blueStartGradient, colors.blueEndGradient]}
        style={[styles.container, this.props.containerStyle]}
      >
         {findAgentHeader ? this.renderFindAgentHeader() : this.renderHeader()}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
