/* @flow */
import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import numeral from 'numeral';
import { withThemes } from 'Root/src/themes';

type Props = {
  onPress?: Function,
  arrayData: Array,
  valueSelected?: string

};

@withThemes
export default class PriceSuggestion extends PureComponent<Props> {
  props: Props;
  static defaultProps = {
    arrayData: [],
  };

  handleOnPress({ item }) {
    const { onPress } = this.props;
    onPress && onPress({ item });
  }

  render() {
    const { arrayData, valueSelected, ...props } = this.props;
    let isSelectOption = null;
    if (valueSelected) {
      const subMoney = numeral(valueSelected)
        .value()
        .toString();
      if (arrayData.indexOf(subMoney) !== -1) {
        isSelectOption = subMoney;
      }
    }
    return (
      <View style={styles.wrapList}>
        {arrayData.length > 0 &&
          arrayData.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => this.handleOnPress({ item })}
              cls="width-30% bdWidth-0.5 bd-placeHolder bdRadius-5 aic jcc mb-15"
              style={
                !!isSelectOption && isSelectOption === item
                  ? { backgroundColor: 'orange' }
                  : { backgroundColor: 'white' }
              }
            >
              <Text
                cls="f-14 pv-8 ph-5 ff-regular"
                style={
                  !!isSelectOption && isSelectOption === item
                    ? { color: 'white' }
                    : { color: 'black' }
                }
              >
                {numeral(item).format('0,0')}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
