import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import I18n from 'react-native-i18n';
import { colors, withThemes } from 'Root/src/themes';
import { deviceHeight, deviceWidth } from 'Root/src/utils/UIHelper';
import Button from '../Button';

type Props = {
  onCancel?: Function,
  onAccept?: Function,
  title?: string,
  message?: string,
  messageNotTranslate?: string,
  textButton?: string
};

@withThemes
export default class AlertModal extends PureComponent<Props> {
  static defaultProps = {
    title: 'notification',
    textButton: 'ok'
  };

  render() {
    const {
      onCancel,
      onAccept,
      title,
      message,
      textButton,
      messageNotTranslate,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
        <View
          cls="width-80% bg-white"
          style={{
            borderWidth: 1,
            borderColor: colors.white,
            borderRadius: 7
          }}
        >
          <View cls="">
            <View cls="aic ph-10">
              <Text cls="f-18 blueLight pv-10 ff-regular">{I18n.t(title)}</Text>
              {message && (
                <Text cls="f-16 black pb-10 ff-regular">{I18n.t(message)}</Text>
              )}
              {messageNotTranslate && (
                <Text cls="f-16 black pb-10 ff-regular">
                  {messageNotTranslate}
                </Text>
              )}
            </View>

            <View cls="flx-row jcsa aife">
              {(onCancel && (
                <Button
                  text="cancel"
                  styleCls="width-100"
                  onPress={() => onCancel()}
                />
              )) ||
                null}
              {(onAccept && (
                <Button
                  text={textButton || 'ok'}
                  styleCls="width-100"
                  onPress={() => onAccept()}
                />
              )) ||
                null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
