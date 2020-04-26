import React from "react";
import { View, ActivityIndicator, Alert, Text, StyleSheet } from "react-native";
import _ from "lodash";
import I18n from "react-native-i18n";
import { withThemes, colors } from "Root/src/themes";
import configs from "Root/src/configs/api";
import store from "Root/src/store";
import errorMapping from "Root/src/configs/errorMapping";
import successMapping from "Root/src/configs/successMapping";
import { authLogout } from "Root/src/store/actions/auth";
import { showDialogUpdateApp } from "Root/src/utils/CommonHelper";

import errorCodeList from "./errorCode";

const delay = (timeout, error) =>
  new Promise((resolve, reject) => setTimeout(() => reject(error), timeout));

type Props = {
  timeOut: number,
  timeWait: number,
  onSuccess: Function,
  onError: Function, // trả về khi lỗi
  url?: string,
  autoLoading: boolean, // tự động request
  params: Object | Array,
  size: "small" | "large",
  containerCls?: Object | Array,
  emptyMessage?: string,
  children?: Object | Function,
  indicatorColor?: string,
  visible: boolean,
  method?: "POST" | "GET",
  keepRawResponse?: boolean // nếu true thì trả về dữ liệu gốc từ request không ánh xạ
};

@withThemes
export default class Request extends React.PureComponent<Props> {
  static defaultProps = {
    autoLoading: true,
    requireAuth: true,
    timeWait: 1000,
    timeOut: 50000,
    onSuccess: () => {},
    size: "large",
    visible: true,
    method: "POST",
    url: configs.API_URI,
    keepRawResponse: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isIndicatorVisible: false
    };
    this.timeWaitFn = null;
    this.mounted = false;
    this.recursiveOnce = false;
    this.params = {};
  }

  componentDidMount() {
    const { autoLoading } = this.props;
    this.mounted = true;
    if (autoLoading) {
      this._handleFetchData();
    }
  }

  componentWillUnmount = () => {
    this._clearTimeouts();
    this.mounted = false;
  };

  _handleFetchData = () => {
    const { params } = this.props;
    this._fetchData(params);
  };

  _fetchData(params) {
    console.log('params',params)
    const { onError, timeOut, url } = this.props;
    const requestContent = this._prepareRequestContent(params);
    console.log("url", url);
    const result = Promise.race([
      fetch(url, requestContent),
      delay(timeOut, {
        error: 500,
        message: "Request timeout!"
      })
    ]);
    result
      .then(response => {
        const { status } = response;
        if (status >= 200 && status < 300) {
          return response.json();
        }
        return Promise.reject({
          message: response.statusText,
          response: response.json()
        });
      })
      .then(responseJson => {
        if (url !== configs.API_URI) {
          return this._handleSuccess(responseJson);
        }
        if (
          responseJson.error !== "00000" ||
          responseJson.responseCode !== "00000"
        ) {
          return this._handleError(onError, {
            message: "Loi tra ve tu core",
            response: responseJson
          });
        }
        return this._handleSuccess(responseJson);
      })
      .catch(error => {
        console.log("err trong catch ==> ", error);
        this._handleError(onError, error);
      });
  }

  _prepareRequestContent(params) {
    const { method } = this.props;
    this.params = params;
    this._setTimeWait();
    const mainRequestContent = {
      ...params,
      headers: {
        "Content-Type": "application/json"
      },
      method
    };
    if (params && params.headers) {
      mainRequestContent.headers = {
        ...mainRequestContent.headers,
        ...params.headers
      };
    }
    return mainRequestContent;
  }

  _handleSuccess(responseJson) {
    const { onSuccess, keepRawResponse } = this.props;
    return this._handleResponse(onSuccess, responseJson, keepRawResponse);
  }

  _handleError(onError, error) {
    const { keepRawResponse, specialCase } = this.props;
    this.recursiveOnce = false;
    if (!this.mounted) {
      return this.setState({
        isIndicatorVisible: false
      });
    }
    this._clearTimeouts();
    this.setState(
      {
        isIndicatorVisible: false
      },
      () => {
        if (error.error === 500) {
          if (specialCase) {
            console.log("dit me may");
            return onError(error);
          } else {
            Alert.alert(
              I18n.t("requestTimeout"),
              I18n.t("canNotConnectToServer")
            );
            return;
          }
        }

        if (error.response) {
          if (!error.response.responseCode) {
            if (onError)
              return onError({
                ...error,
                message: errorMapping(error.response)
              });
            Alert.alert(
              I18n.t("haveSomeProblem"),
              errorMapping(error.response)
            );
            return;
          }
          if (
            errorCodeList.indexOf(error.response.responseCode.toString()) === -1
          ) {
            const statusAcc = error.response.fieldMap.filter(
              item => item.fieldID === 118 || null
            );
            const checkStatus =
              statusAcc.length > 0 ? statusAcc[0].value : null;
            if (error.response.responseCode === 10113) {
              // console.log('error.response',error.response);
              const phoneNumber = error.response.fieldMap.filter(
                item => item.fieldID === 34
              )[0].value;

              if (onError && keepRawResponse) return { message: "", ...error };
              const message = errorMapping(error.response);
              if (onError) {
                if (error.response.processCode !== 311001) {
                  return onError({ ...error, message });
                } else {
                  onError({ ...error, message });
                }
              }
              return Alert.alert(
                I18n.t("haveSomeProblem"),
                checkStatus === 0
                  ? I18n.t("accountNotActive", {
                      phoneCustomer: phoneNumber
                    })
                  : I18n.t("accountIsCanceled", {
                      phoneCustomer: phoneNumber
                    })
              );
            }
            /////
            const message = errorMapping(error.response);
            if (onError && keepRawResponse) return { message: "", ...error };
            if (onError) {
              if (error.response.processCode !== 311001) {
                return onError({ ...error, message });
              }
              return onError({ ...error, message });
            }
            return Alert.alert(
              I18n.t("haveSomeProblem"),
              error.response.responseDescription || "Error null"
            );
          }

          const message = errorMapping(error.response);
          if (onError && keepRawResponse) return { message: "", ...error };
          if (onError) return onError({ ...error, message });

          if (error.response.responseCode.toString() === "99997") {
            showDialogUpdateApp();
            return;
          }

          return Alert.alert(
            I18n.t("haveSomeProblem"),
            message,
            [
              {
                text: I18n.t("ok"),
                onPress: () => {
                  if (error.response.responseCode.toString() === "99998") {
                    store.dispatch(authLogout());
                  }
                }
              }
            ],
            { cancelable: false }
          );
        }

        if (error && keepRawResponse && specialCase) {
          return onError(error);
        }

        Alert.alert(
          "Notifcations",
          "Can not connect to System. Please check mobile internet connection"
        );
        return;
        // return Promise.reject({ message: 'Internal Server Error' });
      }
    );
  }

  _handleResponse = (onResponse, response, keepRawResponse) => {
    this.recursiveOnce = false;
    if (!this.mounted) {
      console.log("day roi ");
      return this.setState({
        isIndicatorVisible: false
      });
    }
    this._clearTimeouts();
    this.setState(
      {
        isIndicatorVisible: false
      },
      () => {
        if (keepRawResponse) {
          return onResponse(response);
        }
        const mappingData = successMapping(response);
        return onResponse(mappingData);
      }
    );
  };

  _setTimeWait = () => {
    const { timeWait } = this.props;
    if (timeWait === 0) {
      return this.setState({
        isIndicatorVisible: true
      });
    }
    if (timeWait) {
      this.timeWaitFn = setTimeout(() => {
        this.setState({
          isIndicatorVisible: true
        });
      }, timeWait);
    }
  };

  _clearTimeouts = () => {
    clearTimeout(this.timeWaitFn);
  };

  render() {
    const { isIndicatorVisible, size } = this.state;
    const {
      containerCls,
      emptyMessage,
      children,
      indicatorColor,
      visible
    } = this.props;

    if (!visible) {
      return <View />;
    }
    if (!isIndicatorVisible) {
      if (emptyMessage || children) {
        return (
          <View cls={[containerCls]}>
            {emptyMessage ? <Text>{emptyMessage}</Text> : null}
            {children || null}
          </View>
        );
      }
      return null;
    }
    return (
      <View cls={[containerCls]} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
        <View style={styles.square}>
          <ActivityIndicator
            color={indicatorColor || colors.orange}
            size={size}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 13,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  }
});
