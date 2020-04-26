import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'Root/src/elements/Icon';
import { withThemes } from 'Root/src/themes';
// import * as calendarSelectors from '~/store/selectors/calendar'
// import * as calendarActions from '~/store/actions/calendar'

@withThemes
export default class CheckBox extends Component {
  onSelectedOption(value) {
    const { input, onSelected } = this.props;
    onSelected && onSelected(value);
    input && input.onChange(value);
  }

  render() {
    const {
      title,
      listOptions,
      input,
      meta: { error, touched }
    } = this.props;

    return (
      <View cls="">
        {title && <Text cls="f-14 black mb-5 ff-regular">{I18n.t(title)}</Text>}
        <View cls="flx-row">
          {listOptions &&
            listOptions.length > 0 &&
            listOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                cls="flx-i flx-row aic"
                onPress={() => this.onSelectedOption(item)}
              >
                {(input && input.value && input.value.id === item.id && (
                  <Icon
                    name="ios-checkmark-circle-outline"
                    cls="f-20 orange"
                  />
                )) || (
                  <Icon
                    name="md-radio-button-off"
                    cls={
                      (!!error && !!input.value) || (error && touched)
                        ? 'f-20 red'
                        : 'f-20 placeHolder'
                    }
                  />
                )}
                <Text
                  cls={
                    (input && input.value && input.value.id === item.id &&
                      'pl-5 f-14 black ff-medium') ||
                    'pl-5 f-14 black ff-medium'
                  }
                >
                  {I18n.t(item.name)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        {(!!error && !!input.value) || (error && touched) ? (
          <View cls="mt-2">
            <Text cls="red f-12 ff-regular">{I18n.t(error)}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
