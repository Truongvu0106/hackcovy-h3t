import React from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener
} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {
  isIphoneX,
  isIphoneXSMax,
  isIOS,
  BOTTOM_SPACE,
  STATUS_BAR_HEIGHT
} from 'Root/src/utils/iPhoneXHelper';
import { colors } from 'Root/src/themes';
import ignoreScreenCheckInactive from 'Root/src/configs/ignoreScreenCheckInactive';

type Props = {
  style: Object, // object of stylesheet
  keepBottomSpace?: boolean, // giu khoang cach duoi
  gradient?: boolean
};
export default class SafeArea extends React.Component<Props> {
  static defaultProps = {
    gradient: false
  };
  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    };
    this.listener = new RNNScreenVisibilityListener({
      didAppear: ({ screen }) => {
        console.log('RNNScreenVisibilityListener ==> ', screen);
        this.screen = screen;
        this.handleActive(screen);
      },
      willDisappear: ({ screen }) => {
        if (ignoreScreenCheckInactive.indexOf(screen) === -1) {
          global.InactiveUser.clearAllTracking();
        }
      }
    });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.onShouldSetPanResponderCapture,
      onPanResponderTerminationRequest: this.onShouldSetPanResponderCapture,
      onStartShouldSetPanResponderCapture: this.onShouldSetPanResponderCapture
    });
  }

  componentDidMount() {
    this.listener.register();
  }

  componentWillUnmount() {
    global.InactiveUser && global.InactiveUser.clearAllTracking();
    if (this.listener) {
      this.listener.unregister();
      this.listener = null;
    }
  }

  onShouldSetPanResponderCapture = () => {
    this.handleActive(this.screen);
    return false;
  };

  handleActive = screen => {
    global.InactiveUser && global.InactiveUser.startTracking(screen);
  };

  renderContent() {
    const { style, children, keepBottomSpace, gradient } = this.props;
    if ((!isIphoneX && !isIphoneXSMax) || !isIOS) {
      if (gradient) {
        return (
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[colors.blueStartGradient, colors.blueEndGradient]}
            style={styles.container}
          >
            {children}
          </LinearGradient>
        );
      }
      return <View style={[styles.container, style && style]}>{children}</View>;
    }
    //
    if (gradient) {
      return (
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={[colors.blueStartGradient, colors.blueEndGradient]}
          style={[
            styles.container,
            {
              paddingBottom: keepBottomSpace ? BOTTOM_SPACE : 0
            },
            style && style
          ]}
        >
          {children}
        </LinearGradient>
      );
    }
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: keepBottomSpace ? BOTTOM_SPACE : 0
          },
          style && style
        ]}
      >
        {children}
      </View>
    );
  }
  render() {
    return (
      <View
        style={{ flex: 1 }}
        {...this.panResponder.panHandlers}
        collapsable={false}
      >
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    opacity: 1
  }
});
