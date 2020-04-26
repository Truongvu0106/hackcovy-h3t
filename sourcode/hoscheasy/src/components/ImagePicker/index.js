import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import I18n from 'react-native-i18n';

import { withThemes, buildThemes, colors } from 'Root/src/themes';
import configs from 'Root/src/configs/api';
import Request from 'Root/src/components/Request';

import Icon from 'Root/src/elements/Icon';

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  noData: false
};

type Props = {
  containerCls?: string,
  imgCls?: string,
  enableUpload?: boolean,
  enableDelete?: boolean, // if image have exists, you can delete
  onSuccess?: Function,
  onError?: Object => void,
  typeUpload?: 'avatar' | 'homestay' | 'room',
  type?: string
};
@withThemes
export default class UploadImage extends React.Component<Props> {
  static defaultProps = {
    containerCls: '',
    enableUpload: true,
    type: 'channel'
  };
  constructor(props: Props) {
    super(props);
    this._handleUpload = this._handleUpload.bind(this);
    this.state = {
      error: false,
      uploading: false
    };
  }

  goRequestUpload(response) {
    const { onSuccess, onError, type } = this.props;
    const formatFile = response.uri.split('.').pop();
    const directory = moment(new Date()).format('YYYYMMDD');
    const checkFileName = `${Math.floor(Math.random() * 100 + 1)}_${moment(
      new Date()
    ).format('YYYYMMDDHHmmss')}.${formatFile}`;

    RNFetchBlob.fetch(
      'POST',
      `${configs.API_UPLOAD}mobile/v2.1/upload`,
      {
        Directory:
          type === 'channel'
            ? `channel/${directory}`
            : `transaction/${directory}`,
        'Content-Type': 'multipart/form-data'
      },
      [
        {
          name: 'images',
          filename: checkFileName,
          type: 'image/png',
          data: RNFetchBlob.wrap(response.uri.replace('file://', ''))
        }
      ]
    )
      .then(res => {
        const responseDATA = JSON.parse(res.data);
        console.log('responseDATA', responseDATA);

        if (
          responseDATA.code === 200 &&
          responseDATA.result === 'Success' &&
          responseDATA.message === 'Success'
        ) {
          onSuccess &&
            onSuccess({
              uri: response.uri,
              directory,
              checkFileName
            });
          this.setState({ uploading: false });
        }
      })
      .catch(e => {
        console.log('eror from upload =>>>>', e);
        this.setState({ uploading: false }, () => onError());
      });
  }

  _handleUpload() {
    ImagePicker.showImagePicker(options, response => {
      if (response.data) {
        console.log('response', response);
        this.setState({ uploading: true }, () =>
          this.goRequestUpload(response)
        );
      }
    });
  }

  render() {
    const { containerCls, enableUpload } = this.props;
    const { error, uploading } = this.state;
    if (uploading) {
      return <ActivityIndicator cls="mt-8" color={colors.orange} size="small" />;
    }
    return (
      <TouchableOpacity
        cls={`jcc aic ph-1 pv-1 ${containerCls}`}
        onPress={this._handleUpload}
        disabled={!enableUpload || uploading}
      >
        <View cls="width-30 asc height-30 bg-orange bdRadius-15 aic jcc">
          <Icon name="md-camera" cls="f-20 white" />
        </View>
        <Text cls="f-14 orange mt-5 ff-regular">{I18n.t('add')}</Text>
      </TouchableOpacity>
    );
  }
}
