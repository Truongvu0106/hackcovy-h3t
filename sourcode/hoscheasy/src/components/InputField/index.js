import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation
} from "react-native";
import I18n from "react-native-i18n";
import numeral from "numeral";
import Icon from "Root/src/elements/Icon";
import { withThemes, colors } from "Root/src/themes";
import images from "Root/src/assets/images";
import ValidateRegex from "Root/src/utils/ValidateRegex";

type Props = {
  input?: Object,
  label?: string,
  placeholder?: string,
  meta?: Object,
  onIconPress?: Function,
  onPress?: Function,
  multiline: boolean,
  secureTextEntry: boolean,
  keyboardType?: string,
  inputStyle?: Object,
  errorList?: Array,
  rightIconStyle?: Object,
  onChangeText?: Function,
  isPhoneContact: boolean,
  autoCorrect: boolean,
  maxLength?: number,
  returnKeyType?: string,
  isNotChangeText?: boolean,
  isInputModal?: boolean,
  autoFocus?: boolean,
  isDefaultVal?: boolean,
  defaultValue?: string
  // valueFormat
};
@withThemes
export default class InputField extends React.PureComponent<Props> {
  props: Props;

  static defaultProps = {
    multiline: false,
    secureTextEntry: false,
    isPhoneContact: false,
    autoCorrect: false,
    maxLength: 10,
    isNotChangeText: false,
    autoFocus: false,
    isInputModal: false,
    isDefaultVal: false,
    returnKeyType: "done",
    placeholder: "enterYourInputHere"
  };

  constructor(props) {
    super(props);
    this.state = {
      secureEntry: props.secureTextEntry
      // : false
    };
    this.arrayNotTrimSpace = [
      "name",
      "content",
      "address",
      "issuePlace",
      "ownerName",
      "bankBranch",
      "shopAddress",
      "shopName",
      'address'
    ];
  }

  onEyePress() {
    this.setState({
      secureEntry: !this.state.secureEntry
    });
  }

  _onChangeValue(text) {
    const { onChangeText, input } = this.props;
    const checkValueNotTrimSpace = this.arrayNotTrimSpace.indexOf(input.name);
    if (checkValueNotTrimSpace === -1) {
      text = text.replace(ValidateRegex.TRIM_SPACE, "").trim();
    }
    switch (input.name) {
      // case "shopName":
      //   text = text.replace(".", "");
      //   break;
      case "phoneNumber":
      case "phone":
        text = text.replace(ValidateRegex.ONLY_NUMBER, "");
        break;

      case "money":
        text = text.replace(ValidateRegex.ONLY_NUMBER, "");
        text = text.replace(ValidateRegex.REMOVE_FIRST_ZERO, "");
        text = numeral(text).format("0,0");
        text === "0" ? (text = "") : text;
        break;
      case "pin":
        text = text.replace(ValidateRegex.ONLY_NUMBER, "");
        break;
      case "otp":
        text = text.replace(ValidateRegex.ONLY_NUMBER, "");
        break;
      case 'address':
        text = (text === ' ' || text === '\n') ? '' : text;
        text = text.replace('.  ', '.').replace('  ', '').replace('\n', '');
        break;
      default:
        break;
    }
    if (onChangeText) {
      return onChangeText(text, input);
    }
    input.onChange(text);
  }

  componentWillReceiveProps(nextProps) {
    const {
      meta: { active }
    } = this.props;

    // if (active !== nextProps.meta.active) {
    //   if (nextProps.meta.active) {
    //     this.setState({ : true });
    //     LayoutAnimation.easeInEaseOut();
    //   } else {
    //     this.setState({ : false });
    //     LayoutAnimation.easeInEaseOut();
    //   }
    // }
  }

  render() {
    const {
      input,
      label,
      meta: { error, active, touched, warning },
      onIconPress,
      // addon,
      onPress,
      styleInputWraper,
      multiline,
      secureTextEntry,
      // iconType,
      inputRef,
      keyboardType,
      inputStyle,
      // containerStyle,
      errorList,
      rightIconStyle,
      valueFormat,
      onChangeText,
      isPhoneContact,
      isLatLong,
      autoCorrect,
      maxLength,
      returnKeyType,
      placeholder,
      isNotChangeText,
      isInputModal,
      autoFocus,
      defaultValue,
      isDefaultVal,
      goContact,
      ...custom
    } = this.props;
    const { secureEntry } = this.state;
    const icon = input && input.value ? "md-close" : null;
    const iconName = icon;
    const iconEnabled = secureEntry ? "" : "-off";
    !!isDefaultVal && !input.value && input.onChange(defaultValue);
    let countDigits = "0";
    if (input.name === "content" || input.name === 'address') {
      countDigits = input && input.value.length.toString();
    }
    return (
      <View>
        {(label && (
          <View>
            <Text cls="f-12 black ff-regular">{I18n.t(label)}</Text>
          </View>
        )) ||
          null}
        <View
          pointerEvents={onPress && "none"}
          cls="flx-row jcfs"
          style={[
            {
              borderColor: (active && "orange") || colors.border,
              borderBottomWidth: 1,
              paddingRight: iconName ? 50 : 0
            },
            error && touched && { borderColor: "orange" },
            styleInputWraper && styleInputWraper
          ]}
          // style={iconName ? { width: '80%' } : { flexGrow: 1 }}
        >
          {(!isNotChangeText && (
            <TextInput
              ref={inputRef}
              {...input}
              {...custom}
              onChangeText={text => this._onChangeValue(text)}
              numberOfLines={1}
              value={input.value}
              placeholderTextColor={colors.placeHolder}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoFocus={autoFocus}
              autoCorrect={autoCorrect}
              maxLength={maxLength}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              multiline={multiline}
              placeholder={I18n.t(placeholder)}
              secureTextEntry={secureEntry}
              // onFocus={() => this.onDismiss(0)}
              // onBlur={() => this.onDismiss(1)}
              cls={[
                "f-14 black ff-regular",
                isInputModal && "tc",
                (input.name === "content" && input.value && "width-85%") ||
                  "width-90%"
              ]}
              style={[
                {
                  textAlignVertical: multiline ? "top" : "bottom",
                  paddingVertical: 5,
                  paddingLeft: 0
                },
                inputStyle
              ]}
            />
          )) || (
            <View cls="fullWidth">
              <Text
                cls="black f-14 ff-regular"
                style={[
                  {
                    paddingVertical: 5,
                    paddingLeft: 0
                  },
                  inputStyle
                ]}
              >
                {valueFormat ? valueFormat(input.value) : input.value}
              </Text>
            </View>
          )}
          <View cls="absolute right-0 bottom-5">
            <View cls="flx-row jcsb">
              {((input.name === "content" || input.name === 'address') && (
                <View onPress={() => {}} cls="flx-row bg-white aife ml-2">
                  <Text cls="placeHolder f-10 ff-regular">
                    {countDigits}/100
                  </Text>
                </View>
              )) ||
                null}
              {!!iconName && !isNotChangeText && (
                <View cls={multiline ? "aife pt-2" : "aife jcc"}>
                  <Icon
                    onPress={() => onIconPress && onIconPress(input)}
                    name={iconName}
                    cls={
                      (input.name === "content" || input.name === 'address')
                        ? "f-16 lightGray pl-10 pr-10"
                        : "f-16 lightGray pl-10 pr-5"
                    }
                    style={[rightIconStyle]}
                  />
                </View>
              )}
              {!!input.value && secureTextEntry && (
                <View cls="aife jcc">
                  <Icon
                    onPress={() => this.onEyePress()}
                    // android={`md-eye${iconEnabled}`}
                    name={`md-eye${iconEnabled}`}
                    cls="f-16 lightGray pl-5 pr-10 "
                    style={[rightIconStyle]}
                  />
                </View>
              )}

              {(isPhoneContact && (
                <TouchableOpacity
                  onPress={() => goContact()}
                  cls={
                    touched === false || (!error && !errorList)
                      ? "pr-0"
                      : "pr-5"
                  }
                >
                  <Image cls="height-20 width-18" source={images.icContacts} />
                </TouchableOpacity>
              )) ||
                null}
              {!error && !errorList && !isPhoneContact && !!input.value && !isLatLong ? (
                <View cls="aife jcc">
                  <Icon name="md-checkmark-circle" cls="f-16 green" />
                </View>
              ) : ((!!error || !!errorList) &&
                  !!input.value &&
                  !isPhoneContact) ||
                (error && touched) ? (
                <View cls="aife jcc">
                  <Icon name="md-alert" cls="f-16 red" />
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {(!!error && !errorList && !!input.value) || (error && touched) ? (
          <View cls="mt-2">
            {/* <Icon name="exclamation-circle" size={15} /> */}
            <Text cls="red f-12 ff-regular">{I18n.t(error)}</Text>
          </View>
        ) : null}

        {(!!errorList && !!input.value) || (errorList && touched)
          ? errorList.map((item, index) => {
              let bg = "";
              bg =
                error && error[index] && error[index].value === 1
                  ? "red"
                  : "green";
              return (
                <View key={index} cls={[`bg-${bg}`, "mt-2", "br-2", "pa-1"]}>
                  <Text cls="f-12 red ff-regular">{I18n.t(item.value)}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}
