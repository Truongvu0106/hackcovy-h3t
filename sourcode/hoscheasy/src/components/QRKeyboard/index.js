import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  LayoutAnimation
} from "react-native";
import numeral from "numeral";
import { withThemes } from "Root/src/themes";
import Icon from "Root/src/elements/Icon";
import Button from "../Button";
import I18n from "react-native-i18n";
import ValidateRegex from "Root/src/utils/ValidateRegex";
const REGEX = /^[0-9]{10}$/;

@withThemes
export default class QRKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      value: "",
      keyboardHeight: null,
      disableSubmit: true,
      error: null
    };
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _keyboardWillShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
    LayoutAnimation.easeInEaseOut();
  };

  _keyboardDidHide = e => {
    this.onClose();
  };

  onOpen() {
    this.setState({ isVisible: true });
  }

  onClose() {
    this.setState({
      isVisible: false,
      value: "",
      disableSubmit: true,
      error: null
    });
  }

  handle = text => {
    text = text.replace(ValidateRegex.ONLY_NUMBER, "");
    if (!REGEX.test(text)) {
      this.setState({
        error: "mustHave10Digits",
        value: text,
        disableSubmit: true
      });
    } else {
      this.setState({ error: null, disableSubmit: false, value: text });
    }
  };

  confirm = () => {
    const { onConfirm } = this.props;
    onConfirm && onConfirm(this.state.value);
    this.onClose();
  };
  render() {
    const {
      isVisible,
      value,
      disableSubmit,
      keyboardHeight,
      error
    } = this.state;
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        hardwareAccelerated
      >
        <View cls="flx-i bg-transparent">
          <TouchableOpacity cls="flx-i" onPress={() => this.onClose()} />

          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              marginBottom: keyboardHeight,
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14
            }}
          >
            <View
              style={{
                borderBottomColor: "orange",
                borderBottomWidth: 1,
                paddingTop: 20,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-start"
              }}
            >
              <TextInput
                keyboardType="numeric"
                value={value}
                cls="pv-10 flx-i"
                onChangeText={text => this.handle(text)}
                autoFocus={true}
                placeholder={I18n.t("enterSerialNumber")}
                maxLength={10}
                underlineColorAndroid={"transparent"}
              />
              {value && value !== "" ? (
                <Icon
                  onPress={() =>
                    this.setState({
                      value: "",
                      error: "mustHave10Digits",
                      disableSubmit: true
                    })
                  }
                  name={"md-close"}
                  cls={`f-16 lightGray pl-10 pr-${disableSubmit ? 5 : 10} pv-5`}
                />
              ) : null}
              {!disableSubmit ? (
                <Icon
                  onPress={() =>
                    this.setState({
                      value: "",
                      error: "mustHave10Digits",
                      disableSubmit: true
                    })
                  }
                  name={"md-checkmark-circle"}
                  cls={"f-16 green pl-5 pr-10 pv-5"}
                />
              ) : null}
            </View>

            <Text cls="red f-14">{error ? I18n.t(error) : ""}</Text>
            <Button
              isDeactive={disableSubmit}
              text="continue"
              styleCls="width-100% asc"
              onPress={this.confirm}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
