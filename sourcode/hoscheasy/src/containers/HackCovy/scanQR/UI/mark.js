import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import { deviceWidth } from 'Root/src/utils/UIHelper';
import { withThemes, appStyleNoNavBar } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import { BOTTOM_SPACE } from 'Root/src/utils/iPhoneXHelper';
import Icons from 'Root/src/elements/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};

@withThemes
export default class MarkOnCamera extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: deviceWidth,
      height: 0
    };
    this._onChangeLayout = this._onChangeLayout.bind(this);
  }

  _onChangeLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  }

  _renderScanbar() {
    return <View style={styles.scanBarLine} />;
  }

  render() {
    const { onClickHistory } = this.props;
    return (
      <View
        cls="jcc top-0 left-0 right-0 bottom-0 absolute aic"
        onLayout={(e) => this._onChangeLayout(e)}
      >
        <View style={styles.contextScanner}>
          <View style={styles.contextScannerBox}>
            <Image source={images.qrconner} cls="fullView" />
          </View>
        </View>
        <View
          style={[
            styles.topMark,
            {
              height: (this.state.height - deviceWidth * 0.7) / 2
            }
          ]}
        >
          {/* <View cls="absolute asc top-16">
            <Text cls="f-12 ff-regular white">{I18n.t("scanHint")}</Text>
          </View> */}
        </View>
        <View
          style={[
            styles.bottomMark,
            {
              height: (this.state.height - deviceWidth * 0.7) / 2
            }
          ]}
        ></View>
        <View
          style={[
            styles.leftMark,
            {
              bottom: (this.state.height - deviceWidth * 0.7) / 2,
              top: (this.state.height - deviceWidth * 0.7) / 2
            }
          ]}
        />
        <View
          style={[
            styles.rightMark,
            {
              bottom: (this.state.height - deviceWidth * 0.7) / 2,
              top: (this.state.height - deviceWidth * 0.7) / 2
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contextScanner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceWidth * 0.7,
    width: deviceWidth * 0.7
  },
  contextScannerBox: {
    height: deviceWidth * 0.7,
    width: deviceWidth * 0.7
  },
  // mark
  topMark: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  bottomMark: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    alignItems: 'center',
    paddingTop: 16
  },
  leftMark: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',

    left: 0,
    width: deviceWidth * 0.15
  },
  rightMark: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',

    right: 0,
    width: deviceWidth * 0.15
  },
  scanBarLine: { height: 2, backgroundColor: '#22ff00' }
});
