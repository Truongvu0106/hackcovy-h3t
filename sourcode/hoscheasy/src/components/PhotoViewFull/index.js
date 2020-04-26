import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import PhotoView from 'react-native-photo-view';
import { withThemes } from 'Root/src/themes';
import Icon from 'Root/src/elements/Icon';
import { deviceHeight, deviceWidth } from "Root/src/utils/UIHelper";
import config from 'Root/src/configs/api';

type Props = {
  data?: String,
  navigator?: Object,
  notDownload?: Boolean
};

@withThemes
export default class PhotoViewFull extends Component {
  render() {
    const { navigator, data, notDownload } = this.props;
    return (
      <View cls="flx-i jcc aic bg-black">
        <View
          cls={`absolute top-0 right-0 left-0 zIndex-100 height-${deviceHeight *
            0.11} width-100%`}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <TouchableOpacity
            onPress={() => {
              navigator.dismissModal({
                animationType: 'slide-down'
              });
            }}
            cls={`aife jcfe pt-${deviceHeight * 0.045} pr-15`}
          >
            <Icon name="ios-close-circle-outline" cls="f-35 white" />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            navigator.dismissModal({
              animationType: 'slide-down'
            });
          }}
          cls={`absolute top-${deviceHeight * 0.07} right-${deviceWidth *
            0.05} zIndex-100`}
        >
          <Icon name="ios-close-circle-outline" cls="f-35 white" />
        </TouchableOpacity> */}
        <PhotoView
          source={
            !notDownload
              ? {
                  uri: `${config.media_url}${data.fileName}`,
                  method: 'GET',
                  headers: {
                    directory: `party_paper/${data.fileDirectory}`
                  }
                }
              : { uri: data.uri || data }
          }
          showsVerticalScrollIndicator
          showsHorizontalScrollIndicator
          scale={1}
          minimumZoomScale={1}
          maximumZoomScale={3}
          fadeDuration={100}
          androidZoomTransitionDuration={100}
          onViewTap={() => {
            navigator.dismissModal({
              animationType: 'slide-down'
            });
          }}
          androidScaleType="fitCenter"
          cls="width-100% height-100%"
        />
      </View>
    );
  }
}
