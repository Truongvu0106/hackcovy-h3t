import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import I18n from 'react-native-i18n';
import { withTheme } from 'themes-rn';
import Request from '../Request';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';
// import { isIOS, makeHitSlop } from 'Root/src/utils/UIHelper';

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

type Props = {
  paramResend: Object,
  trigerFn: Function
};
@withTheme
export default class TimerResend extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      second: 60,
      showBtnResend: false
    };
    this.refRequest = React.createRef();
  }
  componentDidMount() {
    if (this.props.hasRef) {
      this.props.hasRef(this);
    }
  }
  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.timeOut);
  }

  startDownCount = () => {
    if (isIOS) {
      BackgroundTimer.start();
    }
    this.timeOut = BackgroundTimer.setInterval(() => {
      if (this.state.second > 0) {
        this.setState({
          second: this.state.second - 1
        });
      } else {
        this.setState({ showBtnResend: true });
        this.onReset();
      }
    }, 1000);
  };

  onReset = () => {
    console.log('hahahaha');

    this.setState({
      second: 60
    });
    BackgroundTimer.clearInterval(this.timeOut);
  };

  pressReSend = () => {
    const { paramResend, trigerFn, callBackResend } = this.props;
    if (trigerFn) {
      trigerFn();
    }
    BackgroundTimer.clearInterval(this.timeOut);
    this.setState({ showBtnResend: false }, () => {
      console.log('refRequest');
      if (callBackResend) {
        return callBackResend();
      }
      this.refRequest &&
        this.refRequest.current &&
        this.refRequest.current._fetchData({
          body: `${paramResend}`
        });
    });

    // this.props.callAPICommon(
    //   false,
    //   paramResend,
    //   err => {
    //     if (err) {
    //       // return showDiaLog({ message: err });
    //     }
    //     this.setState({ showBtnResend: false }, () => {
    //       this.startDownCount();
    //       // return showDiaLog({
    //       //   message: 'We sent an new OTP to your phone!',
    //       //   type: 'success'
    //       // });
    //     });
    //   },
    //   {
    //     route: '/otp',
    //     method: 'POST'
    //   }
    // );
  };
  onCallResendSuccess = () => {
    Alert.alert(I18n.t('notification'), I18n.t('resendOTP'));
    this.startDownCount();
  };
  onCallResendError = () => {
    this.setState({ showBtnResend: true });
  };

  render() {
    return (
      <React.Fragment>
        <View cls="mt-16 width-100% aic">
          {this.state.showBtnResend ? (
            <TouchableOpacity
              // hitSlop={makeHitSlop(10)}
              onPress={this.pressReSend}
            >
              <Text cls="ff-medium f-16 blue mt-10 underline">
                {I18n.t('resendCode')}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text cls="f-16 ff-medium placeHolder mt-8">
              {I18n.t('resendCode')} {fmtMSS(this.state.second)}
            </Text>
          )}
        </View>
        <Request
          ref={this.refRequest}
          params={{}}
          timeWait={0}
          onSuccess={this.onCallResendSuccess}
          onError={this.onLoginError}
          autoLoading={false}
          visible={false}
        />
      </React.Fragment>
    );
  }
}
