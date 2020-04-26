/* @flow */
import React, { PureComponent } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Keyboard
} from "react-native";
import { reduxForm, Field, getFormValues, getFormSyncErrors } from "redux-form";
import { connect } from "react-redux";

import I18n from "react-native-i18n";
import { colors, withThemes } from "Root/src/themes";
import { deviceHeight, deviceWidth } from "Root/src/utils/UIHelper";
import Icon from "Root/src/elements/Icon";
import ValidateRegex from "Root/src/utils/ValidateRegex";
import InputField from "../InputField";
import ResendBtn from "./ResendBtn";
import Request from "../Request";

type Props = {
  onCancel?: Function,
  onAccept?: Function,
  title?: string,
  message?: string,
  textButton?: string,
  label?: string,
  placeholder?: string,
  isPin?: boolean,
  dataShow?: Object
};
@connect(
  state => ({
    code: getFormValues("inputModal")(state),
    getError: getFormSyncErrors("inputModal")(state)
  }),
  {}
)
@reduxForm({
  form: "inputModal",
  validate: values => {
    const { pin, otp } = values;
    const errors = {};
    if (pin && (pin.length < 6 || !ValidateRegex.OTP_PIN_VALIDATE.test(pin))) {
      errors.pin = "enterCorrectPin";
    }
    if (otp && (otp.length < 6 || !ValidateRegex.OTP_PIN_VALIDATE.test(otp))) {
      errors.otp = "enterCorrectOTP";
    }

    // if (phone && phone.length < 10) {
    //   errors.phone = 'error1013DigitsOnly';
    // }
    // if (
    //   phone &&
    //   phone.length >= 10 &&
    //   !ValidateRegex.MYANMAR_PHONE.test(phone)
    // ) {
    //   errors.phone = 'incorrectPhoneNumber';
    // }
    return errors;
  },
  destroyOnUnmount: true
})
@withThemes
export default class extends PureComponent<Props> {
  props: Props;

  static defaultProps = {
    title: "notification",
    textButton: "ok",
    isPin: false
  };

  constructor(props) {
    super(props);
    this.theFirst = true;
    this.refRequest = React.createRef();
  }
  componentDidMount() {
    this.refResendBtn && this.refResendBtn.startDownCount();
  }
  pressResend = () => {
    const { paramsResendOtp } = this.props;
    console.log("paramsResendOtp", paramsResendOtp);

    this.props.change("otp", "");
    this.refRequest &&
      this.refRequest.current &&
      this.refRequest.current._fetchData({
        body: `${paramsResendOtp}`
      });
  };
  onCallOtpResendSuccess = () => {
    this.refResendBtn && this.refResendBtn.startDownCount();
    Alert.alert(I18n.t("notification"), I18n.t("resendOTP"));
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isPin, onCancel } = this.props;
    if (this.theFirst === true) {
      if (
        (isPin && nextProps.code && nextProps.code.pin.length === 6) ||
        (!isPin && nextProps.code && nextProps.code.otp.length === 6)
      ) {
        this.timeOut && clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          onCancel && onCancel(nextProps.code);
        }, 500);
        this.theFirst = false;
        return;
      }
    }
  }

  render() {
    const {
      onCancel,
      onAccept,
      title,
      message,
      textButton,
      label,
      isPin,
      placeholder,
      dataShow,
      ...props
    } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            cls="width-80% bg-white"
            style={{
              borderWidth: 1,
              borderColor: colors.white,
              borderRadius: 7,
              marginBottom: deviceHeight * 0.1
            }}
          >
            <View cls="">
              <View cls="aic">
                <View cls="flx-row">
                  <View cls="flx-i aic pl-20">
                    <Text cls="f-16 black pv-10 ff-bold">{I18n.t(title)}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    cls="width-20"
                    onPress={() => onCancel()}
                  >
                    <Icon name="md-close" cls="f-16 orange asc" />
                  </TouchableOpacity>
                </View>
              </View>
              <View cls="width-80% asc">
                {!isPin ? (
                  <Text cls="f-14 black pb-10 ff-regular">
                    {I18n.t(message || "contentConfirmOTP")}
                  </Text>
                ) : null}
                {isPin && dataShow ? (
                  <View>
                    <View cls="flx-row">
                      <Text cls="f-14 black pb-10 ff-regular">
                        {I18n.t("receiverName")}:
                      </Text>
                      <Text cls="f-14 black pb-10 ff-regular">
                        {" " + dataShow.customerName}
                      </Text>
                    </View>
                    <View cls="flx-row">
                      <Text cls="f-14 black pb-10 ff-regular">
                        {I18n.t("phoneNumber")}:
                      </Text>
                      <Text cls="f-14 black pb-10 ff-regular">
                        {" " + dataShow.customerPhone}
                      </Text>
                    </View>
                    <View cls="flx-row">
                      <Text cls="f-14 black pb-10 ff-regular">
                        {I18n.t("amount")}:
                      </Text>
                      <Text cls="f-14 orange pb-10 ff-regular">
                        {" " + dataShow.amount}
                        {Number(dataShow.amount) <= 1 ? " Kyat" : " Kyats"}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <Field
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onIconPress={input => input.onChange("")}
                  // label={label}
                  secureTextEntry={isPin ? true : false}
                  name={(isPin && "pin") || "otp"}
                  isInputModal
                  autoFocus
                  placeholder={
                    (isPin && "pleaseInputPinToCompletePurchase") || "enterOTP"
                  }
                  component={InputField}
                  maxLength={6}
                />
              </View>
              <View cls="height-16" />
              {!isPin ? (
                <ResendBtn
                  hasRef={r => (this.refResendBtn = r)}
                  onPressResend={this.pressResend}
                />
              ) : null}
            </View>
          </View>
        </View>
        <Request
          timeWait={0}
          visible={false}
          autoLoading={false}
          ref={this.refRequest}
          onSuccess={this.onCallOtpResendSuccess}
          onError={() => {
            this.refResendBtn && this.refResendBtn.showSend();
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  }
});
