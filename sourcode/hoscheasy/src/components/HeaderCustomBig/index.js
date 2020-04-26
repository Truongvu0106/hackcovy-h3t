import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from 'react-native-i18n';
import Icons from 'Root/src/elements/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { colors, withThemes } from 'Root/src/themes';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';

type Props = {
  goBack?: boolean,
  beforeBackHook?: () => void,
  title?: string,
  navigator?: Object,
  rightButton?: React.ReactElement,
  rightButtonEvent?: () => void
};

@withThemes
export default class HeaderCustomBig extends React.Component<Props> {
  renderHeader() {
    const {
      title,
      navigator,
      goBack,
      rightButton,
      rightButtonEvent,
      beforeBackHook
    } = this.props;
    const navBarButton = {
      'width-56 height-56': !isIOS,
      'width-44 height-44': isIOS
    };
    const navBar = {
      'height-100': !isIOS,
      'height-96': isIOS
    };
    return (
      <View cls={['width-100%', navBar]}>
        <View cls={['flx-row flx-i aic']}>
          {goBack ? (
            <TouchableOpacity
              cls={['aic jcc asc', navBarButton]}
              onPress={() => {
                beforeBackHook && beforeBackHook();
                navigator.pop();
              }}
            >
              <Icons
                name="ios-arrow-round-back"
                size={40}
                color={colors.white}
              />
            </TouchableOpacity>
          ) : (
            <View cls={navBarButton} />
          )}
          <View cls="flx-i" />
          {rightButton ? (
            <TouchableOpacity
              cls={[
                'aic jcc asc pr-16',
                {
                  'height-56': !isIOS,
                  'height-44': isIOS
                }
              ]}
              onPress={() => rightButtonEvent()}
            >
              {rightButton}
            </TouchableOpacity>
          ) : null}
        </View>
        <View cls="flx-i jcfe pb-12 pl-16">
          <Text cls="f-22 ff-bold white" numberOfLines={1}>{title ? I18n.t(title) : ''}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
        style={[styles.container, this.props.containerStyle]}
      >
        {this.renderHeader()}
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
