import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import I18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';
import { withTheme } from 'themes-rn';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';
import { colors } from 'Root/src/themes';

@withTheme
export default class ResendBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 60,
      showBtnResend: false,
    };
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
    console.log('run contDown');

    if (isIOS) {
      BackgroundTimer.start();
    }
    if (this.state.showBtnResend) {
      this.setState({ showBtnResend: false });
    }
    this.timeOut = BackgroundTimer.setInterval(() => {
      if (this.state.second > 0) {
        this.setState({
          second: this.state.second - 1,
        });
      } else {
        this.setState({ showBtnResend: true });
        this.onReset();
      }
    }, 1000);
  };

  onReset = () => {
    this.setState({
      second: 60,
    });
    BackgroundTimer.clearInterval(this.timeOut);
  };
  showSend = () => {
    this.setState({ showBtnResend: true });
  };

  pressReSend = () => {
    const { onPressResend } = this.props;
    this.setState(
      {
        showBtnResend: false,
      },
      () => onPressResend && onPressResend(),
    );
    // BackgroundTimer.clearInterval(this.timeOut);
    // this.setState({ showBtnResend: false }, () => {
    //   onPressResend && onPressResend();
    // });
  };

  render() {
    return this.state.showBtnResend ? (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
        cls="width-60% asc bdRadius-5 bg-borderModal mb-10 pv-10"
      >
        <TouchableOpacity
          onPress={this.pressReSend}
          disabled={!this.state.showBtnResend}
          hitSlop={{ top: 4, bottom: 4, left: 20, right: 20 }}
          cls="aic jcc"
        >
          <Text cls="white">{I18n.t('resendOtp1')}</Text>
        </TouchableOpacity>
      </LinearGradient>
    ) : (
      <View cls="width-200 asc bdRadius-5 bg-placeHolder mb-10 pv-10 aic jcc">
        <Text cls="white">
          {I18n.t('resendOtp1')} ({fmtMSS(this.state.second)})
        </Text>
      </View>
    );
  }
}

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
