import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text
} from 'react-native';
import { get } from 'lodash';
import I18n from 'react-native-i18n';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withThemes, colors } from 'Root/src/themes';

@withThemes
export default class PasswordField extends React.Component {
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
    if (value.indexOf(' ') == 0) {
      value = value.substr(1, value.length);
    }
    const { hookFn, input, blockInputRegex, type, isName } = this.props;
    if (Array.isArray(blockInputRegex)) {
      for (const reg of blockInputRegex) {
        if (isName) {
          value = value.replace(reg, '');
        } else {
          value = value.replace(reg, '').replace(/ /g, '');
        }
      }
    }
    if (type === 'phone' && value.substr(0, 2) === '95') {
      // value = "+" + value;
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
        console.log('HHEDHEDE');
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
      errorList,
      meta: { error, active, touched },
      ...props
    } = this.props;
    return (
      <View>
        <View
          cls={[
            'mt-32 pv-12 flx-row pl-16 pr-8 aic bdWidth-1 bdRadius-5',
            { 'bd-border': !active, 'bd-orangeBlur': active },
            inputWrapCls && inputWrapCls
          ]}
        >
          <TextInput
            ref={r => (this.r = r)}
            placeholder={I18n.t(placeholder)}
            cls={['f-16 fw4 ff-regular flx-i pv-4', inputCls && inputCls]}
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
        {(!!error && !errorList && !!input.value) || (error && touched) ? (
          <View cls="mt-2">
            {/* <Icon name="exclamation-circle" size={15} /> */}
            <Text cls="red f-12 ff-regular">{I18n.t(error)}</Text>
          </View>
        ) : null}

        {(!!errorList && !!input.value) || (errorList && touched)
          ? errorList.map((item, index) => {
              let bg = '';
              bg =
                error && error[index] && error[index].value === 1
                  ? 'red'
                  : 'green';
              return (
                <View key={index} cls={[`bg-${bg}`, 'mt-2', 'br-2', 'pa-1']}>
                  <Text cls="f-12 red ff-regular">{I18n.t(item.value)}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}
