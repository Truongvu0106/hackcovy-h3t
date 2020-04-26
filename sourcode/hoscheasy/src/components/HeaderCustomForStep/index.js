import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'Root/src/elements/Icon';
import I18n from 'react-native-i18n';
import { withThemes, colors } from 'Root/src/themes';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';

type Props = {
  title?: string,
  navigator?: Object,
  containerCls?: Object,
  goBack?: boolean,
  close?: boolean
};

@withThemes
export default class CustomNavbar extends PureComponent<Props> {
  static defaultProps = {
    close: true
  };

  renderHeader() {
    const { title, navigator, goBack } = this.props;
    const navBarButton = {
      'width-56 height-56': !isIOS,
      'width-44 height-44': isIOS
    };
    const navBar = {
      'height-56': !isIOS,
      'height-44': isIOS
    };
    return (
      <View cls={['flx-row width-100% aic', navBar]}>
        {goBack ? (
          <TouchableOpacity
            cls={['aic jcc asc', navBarButton]}
            onPress={() => navigator.pop()}
          >
            <Icon name="md-arrow-back" size={25} color={colors.black} />
          </TouchableOpacity>
        ) : (
          <View cls={['aic jcc asc', navBarButton]} />
        )}
        <View cls="flx-i jcc aic">
          <Text cls="f-12 ff-medium black">{title || ''}</Text>
        </View>
        <TouchableOpacity
          cls={['aic jcc asc', navBarButton]}
          onPress={() => navigator.popToRoot()}
        >
          <Icon name="md-close" size={25} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { containerCls } = this.props;
    return (
      <View cls={['flx-row aic jcsb', containerCls && containerCls]}>
        {this.renderHeader()}
      </View>
    );
  }
}
