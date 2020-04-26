import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import I18n from "react-native-i18n";
import { withThemes, colors } from "Root/src/themes";
import Button from "Root/src/components/Button";
import images from "Root/src/assets/images";
import config from "Root/src/configs/api";
import Request from "Root/src/components/Request";
import store from "Root/src/store";
import Modal from "react-native-modal";
import { deviceWidth, deviceHeight } from "Root/src/utils/UIHelper";
import moment from "moment";
import { debounce } from "lodash";
import { showDialogUpdateApp } from 'Root/src/utils/CommonHelper';

@withThemes
export default class ModalScan extends Component {
  constructor(props) {
    super(props);
    this.refSaveAgentInfo = React.createRef();
    this.state = {
      isVisible: false,
      isSuccess: false,
      data: null,
      error: "",
      currentLocations: "",
      isActive: true
    };
  }

  onOpen(obj, currentLocations) {
    this.setState({
      isVisible: true,
      isSuccess: obj.isSuccess,
      data: obj.data,
      error: obj.error ? obj.error : "aaaa",
      currentLocations: currentLocations,
      isActive: true
    });
  }

  onClose() {
    this.setState({
      isVisible: false,
      isSuccess: false,
      data: null,
      error: "",
      isActive: false
    });
    this.timeOut && clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.props.onClose();
    }, 300);
  }

  confirm = () => {
    this.onClose();
  };

  render() {
    const profile = store.getState().auth.profile || {};
    const {
      isVisible,
      isSuccess,
      data,
      error,
      currentLocations,
      isActive
    } = this.state;
    if (data) {
      console.log('url',`${config.API_MOBILE_GATEWAY}/setCSECheckin?agentCode=${
        data.code ? data.code : ""
      }&agentDate=${
        data.date ? moment(data.date).format("YYYYMMDDHHmmss") : ""
      }${
        currentLocations &&
        currentLocations.latitude &&
        currentLocations.longitude
          ? `&lat=${currentLocations.latitude}&lon=${currentLocations.longitude}`
          : ""
      }&token=${profile && profile.token ? profile.token : ""}&check=${
        data.check ? data.check : ""
      }&cseCode=${
        profile && profile.staffCode ? profile.staffCode : ""
      }`)
    }
    return (
      <Modal
        style={{
          width: deviceWidth,
          height: deviceHeight,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: 0,
          padding: 0
        }}
        visible={isVisible}
        hideModalContentWhileAnimating
        useNativeDriver
        onBackdropPress={() => this.onClose()}
      >
        <View cls="width-90% bg-white bdRadius-12 asc jcc aic ph-10">
          <View cls="width-90% jcc aic">
            <View
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                top: -30
              }}
            >
              {isSuccess ? (
                <Image
                  source={images.ic_qr_success}
                  cls={["width-58 height-58"]}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={images.ic_qr_false}
                  cls={["width-58 height-58"]}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
          {!!isSuccess && (
            <Text cls="mt-40 mb-20 f-24 tc black" style={{ fontWeight: "500" }}>
              {"Thành công!"}
            </Text>
          )}
          {!!isSuccess && (
            <View cls="width-100% height-45 mb-10">
              <Text cls="f-16 black mb-4" style={{ textAlign: 'center', fontWeight: "500" }}>
                {"Bạn đã tạo lịch khám thành công"}
              </Text>
            </View>
          )}
          <Button
            textRaw={"Xem lịch khám"}
            isActive={isActive}
            onPress={debounce(this.confirm, 400)}
          />
        </View>
      </Modal>
    );
  }
}
