import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Image
} from 'react-native';
import { withThemes } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import Button from '../Button';

@withThemes
export default class ModalNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      disableSubmit: true,
      error: null,
      isSuccess: false,
      message: null,
      title: null
    };
  }

  onOpen(obj) {
    this.setState({ isVisible: true, isSuccess: obj.isSuccess, message: obj.message, title: obj.title });
  }

  onClose() {
    this.setState({
      isVisible: false,
    });
  }

  confirm = () => {
    const { onConfirm } = this.props;
    const { isSuccess } = this.state;
    if (isSuccess) {
      onConfirm && onConfirm();
    }
    this.onClose();
  };
  render() {
    const {
      isVisible, isSuccess, message, title
    } = this.state;
    return (
      <Modal
        visible={isVisible}
        animationType="fade"
        hideModalContentWhileAnimating
        transparent
        useNativeDriver
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <View cls="width-90% bg-white bdRadius-12 jcc aic ph-10">
            <View cls="width-90% jcc aic">
              <View style={{ width: 60, height: 60, position: 'absolute', top: -30 }}>
                {isSuccess ? <Image source={images.ic_success} cls={['width-58 height-58']} resizeMode="contain" /> :
                  <Image source={images.ic_false} cls={['width-58 height-58']} resizeMode="contain" /> }
              </View>
            </View>
            { title ? <Text cls="mt-48 f-24 fw4 tc">{title}</Text> : <View cls='height-20' /> }
            <View cls='height-16' />
            <Text cls="mt-10 f-16 tc">{message}</Text>
            <View cls='height-32' />
            <Button
              text={'ok'}
              isActive
              onPress={() => this.confirm()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
