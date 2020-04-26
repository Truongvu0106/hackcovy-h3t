import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';
import { withThemes, colors } from 'Root/src/themes';
import ValidateRegex from 'Root/src/utils/ValidateRegex';
import { deviceWidth, makeHitSlop } from 'Root/src/utils/UIHelper';
import Icons from 'Root/src/elements/Icon';

// const DEFAULT_MAX_LENGTH = 30;

@withThemes
export default class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusSearch: false,
      isDeleteVisible: false,
      text: '',
      value: ''
    };
  }

  handleOnBlur() {
    const { value } = this.state;
    this.setState({ isFocusSearch: false });
    if (value) {
      let redundantValue = value.trim();
      this.setState({ value: redundantValue });
    }
  }
  onChangeText = text => {
    const { search } = this.props;
    text = text.replace(ValidateRegex.ONLY_CHARACTER_PATTERN, '');
    if (text.trim() === '') {
      this.setState({ value: text });
    } else {
      this.setState({ value: text });
    }
    if (search) {
      search(text);
    }
  };
  onClear = () => {
    const { search } = this.props;
    this.setState({ value: '' });
    this.textInput.clear();
    //this.props.search;
    if (search) {
      search('');
    }
  };
  render() {
    const { isHistory, placeholder, maxLength } = this.props;
    const { value } = this.state;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[
          colors.startInputSearchGradient,
          colors.endInputSearchGradient
        ]}
        cls={`width-${deviceWidth - 32} height-40 bdRadius-10`}
      >
        <View cls="width-100% height-100% jcc flx-row aic pl-16 pr-10">
          <Icons name="ios-search" size={20} color="rgba(255,255,255,0.5)" />

          <TextInput
            placeholder={placeholder ? I18n.t(placeholder) : I18n.t('search')}
            cls="ml-8 f-16 mr-32 flx-i white ff-regular pv-2"
            value={value}
            onChangeText={this.onChangeText}
            autoFocus={isHistory ? false : true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={maxLength || 30}
            //onEndEditing={this.getPlaceFromAPI}
            spellCheck={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onBlur={() => {
              this.handleOnBlur();
            }}
            ref={input => {
              this.textInput = input;
            }}
            returnKeyType="search"
          />

          {value.length > 0 && (
            <TouchableOpacity
              hitSlop={makeHitSlop(10)}
              onPress={this.onClear}
              cls="absolute right-16 jcc aic"
            >
              <Icons name="ios-close" size={24} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    );
  }
}
