import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import { withThemes, colors } from 'Root/src/themes';
import Icon from 'Root/src/elements/Icon';
import { makeHitSlop, deviceWidth } from 'Root/src/utils/UIHelper';
import images from 'Root/src/assets/images';

@withThemes
export default class ModalGuide extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }

  onOpen = () => {
    this.setState({ isVisible: true });
  };

  onClose = () => {
    this.setState({ isVisible: false });
  };

  renderGuide = () => {
    const cpn = (
      <Image
        source={images.img_map_demo_two}
        cls={`width-${deviceWidth - 48} height-${(deviceWidth - 48)/1.56} mb-10`}
        resizeMode="contain"
      />)
    return cpn;
  };

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackdropPress={this.onClose}
        hideModalContentWhileAnimating
        useNativeDriver
      >
        <View cls="flx-i jcc aic">
          <View cls="width-100% bg-white bdRadius-12 jcc aic">
            <Text cls="f-16 mt-30 mb-10">Sơ đồ</Text>
            {this.renderGuide()}
            <TouchableOpacity
              hitSlop={makeHitSlop(5)}
              cls="absolute top-10 right-20"
              onPress={this.onClose}
            >
              <Icon name="md-close" size={25} color={colors.blueStartGradient} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
