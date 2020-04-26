import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { withThemes } from 'Root/src/themes';
import UserAvatar from 'Root/src/components/UserAvatar';

@withThemes
export default class Item extends Component {
  render() {
    const { item, onChooseContact } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onChooseContact && onChooseContact(item)}
        cls="width-100%"
      >
        <View cls="width-100% flx-row aic">
          <View cls="width-80 aic jcc pv-10">
            <UserAvatar name={item.shortName} />
          </View>
          <View cls="flx-i bbhl gray">
            <View cls="flx-i jcc pv-10">
              <Text cls="contactName">{item && item.fullName}</Text>
              <Text cls="contactPhone">{item && item.phone}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
