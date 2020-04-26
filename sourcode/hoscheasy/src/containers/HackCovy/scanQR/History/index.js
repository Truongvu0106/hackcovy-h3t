import React from "react";
import { withThemes, colors } from "Root/src/themes";
import { View, TouchableOpacity, Alert } from "react-native";
import UI from "./UI";
import SafeArea from "Root/src/components/SafeAreaView";
import LinearGradient from "react-native-linear-gradient";
import InputSearch from "Root/src/containers/TabHome/TakeCareAgent/History/InputSearch";
import Icons from "Root/src/elements/Icon";
import Request from "Root/src/components/Request";
import { connect } from "react-redux";
import config from "Root/src/configs/api";
import { groupBy, sortBy } from "lodash";
import I18n from "react-native-i18n";

@connect(state => ({
  profile: state.auth.profile || {}
}))
@withThemes
export default class TakeCareHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.refGetListAgent = React.createRef();
  }

  componentDidMount() {
    this.refGetListAgent &&
      this.refGetListAgent.current &&
      this.refGetListAgent.current._fetchData();
  }

  onGetListAgentSuccess = data => {
    if (!data) {
      return;
    }
    const arr = groupBy(data.fieldMap, it => it.code);
    const customData = [];
    console.log("arr", arr);
    for (const item in arr) {
      let itemArr = arr[item];
      let cusData = {
        name: itemArr[0].name,
        code: itemArr[0].code,
        phone: itemArr[0].phone,
        date: itemArr.map(ele => ele.date)
      };
      console.log("itemArr", itemArr);
      // sortBy(itemArr,'date')
      console.log("object", sortBy(itemArr, "date"));
      customData.push(cusData);
    }
    this.setState({
      data: sortBy(customData, "date"),
      beforeData: sortBy(customData, "date")
    });
  };

  onGetListAgentError = error => {
    console.log("error", error);
    Alert.alert(I18n.t("someThingWrong"));
  };

  onSearch = text => {
    const { beforeData } = this.state;
    this.timeOut && clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      const valText = text.toLowerCase();
      const valText2 = valText.split(" ");
      if (beforeData && beforeData.length > 0) {
        const subArr = beforeData.filter(item => {
          return valText2.every(
            el =>
              item.phone
                .trim()
                .toLowerCase()
                .indexOf(el) > -1 ||
              item.name
                .trim()
                .toLowerCase()
                .indexOf(el) > -1
          );
        });
        this.setState({ data: sortBy(subArr, "date") });
      }
    }, 100);
  };

  clear = () => {
    this.setState({ data: this.state.beforeData });
  };

  render() {
    const { profile } = this.props;
    const { data } = this.state;
    return (
      <SafeArea gradient goBack>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
        >
          <View cls={["flx-row width-100% aic height-56"]}>
            <TouchableOpacity
              cls={["aic jcc asc width-56 height-56"]}
              onPress={() => this.props.navigator.pop()}
            >
              <Icons
                name="ios-arrow-round-back"
                size={35}
                color={colors.white}
              />
            </TouchableOpacity>
            <InputSearch changeText={this.onSearch} onClear={this.clear} />
          </View>
        </LinearGradient>
        <UI data={data} navigator={this.props.navigator} />
        {profile && (
          <Request
            method="GET"
            keepRawResponse
            url={`${config.API_MOBILE_GATEWAY}/getHistoryCheckin?accountId=${
              profile.accountId ? profile.accountId : ""
            }&cseCode=${profile.staffCode ? profile.staffCode : ""}&token=${
              profile.token ? profile.token : ""
            }`}
            ref={this.refGetListAgent}
            timeWait={0}
            onSuccess={this.onGetListAgentSuccess}
            onError={this.onGetListAgentError}
            autoLoading={false}
            params={{}}
            containerCls="zIndex-1 fullParent absolute aic jcc"
          />
        )}
      </SafeArea>
    );
  }
}
