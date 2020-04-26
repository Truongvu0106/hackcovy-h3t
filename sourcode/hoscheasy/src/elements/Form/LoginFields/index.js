import React from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { get } from 'lodash';
import I18n from 'react-native-i18n';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withThemes, colors } from 'Root/src/themes';

@withThemes
export default class FieldLogin extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      showIconSee: false
    };
  }

  componentDidMount() {
    this.firsTime = true;
    this.canAutoSubmit = true;
    this.props.autoFocus &&
      this.refInput &&
      this.refInput.current &&
      this.refInput.current.focus();
  }
  onChangeText = (value: string) => {
    const { hookFn, input, blockInputRegex, type } = this.props;
    if (Array.isArray(blockInputRegex)) {
      for (const reg of blockInputRegex) {
        value = value.replace(reg, '').replace(' ', '');
      }
    }
    if (type === 'phone' && value.substr(0, 2) === '95') {
      // value = '+' + value;
    }
    this.firsTime && hookFn && hookFn();
    this.firsTime = false;
    input.onChange(value);
    if (type === 'pin' && /^[\d]{6}$/g.test(value)) {
      this.canAutoSubmit = true;
    }
  };

  toggleEye = () => {
    this.setState({ showIconSee: !this.state.showIconSee }, () =>
      Keyboard.dismiss()
    );
  };

  componentWillReceiveProps(nextProps) {
    const { type, autoSubmit, input } = this.props;
    if (type === 'pin' && autoSubmit) {
      const error = get(nextProps, 'meta.error');
      const value = get(nextProps, 'input.value');
      const active = get(nextProps, 'meta.active');
      if (/^[\d]{6}$/g.test(value) && !error && active && this.canAutoSubmit) {
        input && input.onBlur();
        this.canAutoSubmit = false;
        autoSubmit && autoSubmit();
      }
    }
  }

  render() {
    const { showIconSee } = this.state;
    const {
      placeholder,
      input,
      inputWrapCls,
      inputCls,
      canShowText,
      secureTextEntry,
      meta: { error, active, touched },
      ...props
    } = this.props;
    return (
      <View
        cls={['pv-12 flx-row pl-16 pr-8 aic', inputWrapCls && inputWrapCls]}
      >
        <TextInput
          ref={r => (this.r = r)}
          placeholder={I18n.t(placeholder)}
          cls={['f-16 fw5 ff-medium flx-i pv-4', inputCls && inputCls]}
          onChangeText={this.onChangeText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          secureTextEntry={!showIconSee && secureTextEntry}
          autoCorrect={false}
          {...props}
          {...input}
        />
        {input.value !== '' && canShowText && active ? (
          <TouchableOpacity cls="mr-6" onPress={this.toggleEye}>
            <MaterialCommunityIcons
              name={showIconSee ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={colors.darkGray}
            />
          </TouchableOpacity>
        ) : null}
        {input.value !== '' && active ? (
          <TouchableOpacity cls="mr-6" onPress={() => input.onChange('')}>
            <AntIcon name="close" size={18} color={colors.darkGray} />
          </TouchableOpacity>
        ) : null}
        {!error && !!input.value && (
          <AntIcon name="checkcircle" size={18} color={colors.green} />
        )}

        {(!!error && !!input.value) || (error && touched) ? (
          <AntIcon name="exclamationcircle" size={18} color={colors.red} />
        ) : null}
      </View>
    );
  }
}
