/* @flow */
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  PixelRatio,
  FlatList,
  Keyboard,
  Text
} from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import I18n from 'react-native-i18n';

import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';

type Props = {
  // input?: Object,
  fieldToShow?: string,
  fieldToCompare?: string,
  defaultValue?: string,
  modalTitle?: string,
  defauleIsPlaceHoder: boolean,
  isSmall?: boolean,
  label?: string
};
@withThemes
export default class extends React.Component {
  props: Props;

  static defaultProps = {
    defauleIsPlaceHoder: false,
    modalTitle: 'type',
    isSmall: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      selectedItem: null,
      defaultSelect: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { defaultSelect } = nextProps;
    this.setState({ defaultSelect });
  }

  componentWillUnmount() {
    this.unmount = true;
  }
  _renderItem = ({ item }) => {
    const { fieldToCompare, fieldToShow, input } = this.props;
    const { selectedItem, defaultSelect } = this.state;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.selectItem(item)}
      >
        <View>
          <Text
            style={{
              ...styles.itemText,
              color:
                (selectedItem &&
                  selectedItem[fieldToCompare] === item[fieldToCompare]) ||
                input.value === item.name ||
                (input.value.name && input.value.name === item.name) ||
                (defaultSelect && !selectedItem && defaultSelect[fieldToCompare] === item[fieldToCompare])
                  ? 'orange'
                  : '#000'
            }}
          >
            {item[fieldToShow]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'gray', fontSize: 16 }}>
          {I18n.t('dataNotFound')}
        </Text>
      </View>
    );
  };

  selectItem = item => {
    const { input, onSelected } = this.props;
    onSelected && onSelected(item);
    input && input.onChange(item);
    !this.unmount &&
      this.setState({
        selectedItem: item,
        show: false
      });
  };

  render() {
    const {
      data,
      defaultValue,
      modalTitle,
      fieldToShow,
      isSmall,
      defauleIsPlaceHoder,
      touchStyle,
      showError,
      meta,
      label,
      input,
      fieldToCompare,
      isAgentDetails
    } = this.props;
    const { show, selectedItem } = this.state;
    const toShow = _.get(input.value, fieldToShow, null);
    const isDefaultVal = !!(defauleIsPlaceHoder === true && defaultValue);
    const typeIsArray = _.isArray(data);
    !!isDefaultVal && !input.value && input.onChange(defaultValue);
    return (
      <View>
        {label ? (
          <Text cls="f-12 black ff-regular">{I18n.t(label)}</Text>
        ) : null}
        <TouchableOpacity
          style={[
            styles.field,
            touchStyle,
            {
              borderBottomColor:
                meta.touched && meta.error ? 'orange' : '#dddd',
              borderBottomWidth: 1
            }
          ]}
          onPress={() => {
            Keyboard.dismiss();
            !this.unmount && this.setState({ show: true });
          }}
        >
          <Text
            cls={
              input.value || isDefaultVal
                ? 'f-14 black ff-regular'
                : 'f-14 placeHolder ff-regular'
            }
          >
            {(toShow && toShow) ||
              (isDefaultVal ? defaultValue : I18n.t(defaultValue))}
          </Text>
          {(showError && meta.error && meta.touched && (
            <Icon name="md-alert" cls="f-16 red" />
          )) || <Icon name="ios-arrow-down" cls="f-16 darkGray" />}
        </TouchableOpacity>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          isVisible={show}
          onBackdropPress={() => this.setState({ show: false })}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View
            cls={[
              'width-90% height-50% bg-white bdRadius-10 bhl asc pb-8',
              isSmall && 'width-50%'
            ]}
          >
            <View style={styles.headerModal}>
              <View cls="flx-i aife">
                <Text cls="f-18 asc black ff-bold ml-20">{I18n.t(modalTitle)}</Text>
              </View>
              {
                isAgentDetails ? (
                  <TouchableOpacity
                    onPress={() => !this.unmount && this.setState({ show: false })}
                    activeOpacity={0.5}
                    cls="width-20 mb-5 mr-5"
                  >
                    <Icon name="md-close" size={16} color={colors.black} />
                  </TouchableOpacity>
                ) : null
              }

            </View>
            {typeIsArray ? (
              <View cls="flx-i pv-5">
                <FlatList
                  contentContainerStyle={{ width: '100%' }}
                  removeClippedSubviews
                  shouldRasterizeIOS
                  renderToHardwareTextureAndroid
                  data={data}
                  renderItem={this._renderItem.bind(this)}
                  ListEmptyComponent={this.renderEmpty}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.item}
                onPress={() => this.selectItem(data)}
              >
                <View>
                  <Text
                    style={{
                      ...styles.itemText,
                      color:
                        (selectedItem &&
                          selectedItem[fieldToCompare] ===
                            data[fieldToCompare]) ||
                        input.value === data.name ||
                        (input.value.name && input.value.name === data.name)
                          ? 'orange'
                          : '#000'
                    }}
                  >
                    {data[fieldToShow]}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {/* <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={styles.btnOK}

              >
                <Text style={styles.btnText}>{I18n.t('close')}</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Modal>
        {showError && meta.error && meta.touched && (
          <View cls="flx-row mt-2">
            {/* <Icon name="md-alert" cls="f-16 red" />
            <Text cls="red f-12 ml-5">{I18n.t(meta.error)}</Text> */}
            <Text cls="red f-12 ff-regular">{I18n.t(meta.error)}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
    marginTop: 5
  },
  container: {
    minHeight: '60%',
    width: '90%',
    // flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignSelf: 'center',
    paddingBottom: 8
  },
  headerModal: {
    paddingVertical: 10,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: StyleSheet.hairlineWidth
    // backgroundColor: 'orange'
  },
  itemText: {
    color: 'orange' || '#000',
    fontSize: 16
  }
  // btnOK: {
  //   backgroundColor: colors.blue,
  //   width: deviceWidth * 0.4,
  //   borderRadius: 3,
  //   paddingVertical: 4,
  //   alignItems: 'center',
  //   alignSelf: 'center'
  // },
  // btnText: {
  //   fontSize: 16,
  //   color: '#FFF'
  // }
};
