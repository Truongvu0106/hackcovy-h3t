import React from 'react';
import { Text, View, TouchableOpacity, Image, Clipboard } from 'react-native';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import { withThemes } from 'Root/src/themes';
import Icon from 'Root/src/elements/Icon';
import Button from '../Button';

type Props = {};

@withThemes
export default class ModalSuccess extends React.PureComponent<Props> {
  props: Props;
  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      isVisible: false,
      transactionId: '',
      transmissionDate: '',
      customerName: '',
      amount: '',
      isActive: false,
      data: {}
    };
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  onOpen = data => {
    this.setState({ isVisible: true, data });
  };

  onClose() {
    this.setState({ isVisible: false });
  }

  // copied() {
  //   const { data } = this.state;
  //   Clipboard.setString(data.pinCode.toString());
  //   // alert('Copy')
  //   ToastCus(I18n.t('copied'), Toast.positions.TOP);
  // }

  backHome() {
    this.onClose();
    this.props.navigator.popToRoot();
  }

  render() {
    const { data } = this.state;
    const { isAmount } = this.props;
    let formatTime = null;
    if (data.transactionDateTime) {
      const formatString = data.transactionDateTime.toString();
      const year = formatString.slice(0, 4);
      const month = formatString.slice(4, 6);
      const date = formatString.slice(6, 8);
      const h = formatString.slice(8, 10);
      const m = formatString.slice(10, 12);
      const s = formatString.slice(12, 14);
      formatTime = `${date}/${month}/${year} ${h}:${m}:${s}`;
    }
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackdropPress={() => {}}
        // onBackdropPress={() => this.onClose()}
        hideModalContentWhileAnimating
        useNativeDriver
      >
        <View cls="flx-i jcc aic">
          <View cls="width-90% bg-white bdRadius-12 jcc aic ph-10">
            <View cls="height-10" />
            <Text cls="f-16 black ff-medium mb-5 mt-20">
              {data && data.transactionType
                ? I18n.t(`${data.transactionType}`)
                : I18n.t('transactionDone')}
            </Text>
            <View cls="height-10" />

            <View cls="width-100%">
              <View cls="width-100% jcsb flx-row">
                {data && data.transactionId && data.transactionId !== 0 ? (
                  <Text cls="f-14 black ff-regular">
                    # {data.transactionId}
                  </Text>
                ) : null}
                {data && data.transactionDateTime ? (
                  <Text cls="f-14 black ff-regular">{formatTime}</Text>
                ) : null}
              </View>

              <View cls="width-100% jcsb flx-row">
                {data && data.fee && data.fee !== '0 Kyat' ? (
                  <Text cls="f-14 black ff-bold black">
                    {I18n.t('fee')}: {data.fee}
                  </Text>
                ) : null}
                {data && data.discount && data.discount !== '0 Kyat' ? (
                  <Text cls="f-14 black ff-bold black">
                    {`${I18n.t('discount')}: ${data.discount}` || null}
                  </Text>
                ) : null}
              </View>
            </View>

            <View cls="height-1 bg-border width-100% mt-5" />
            <Text cls="f-16 black ff-regular black mt-10 mb-10">
              {isAmount ? I18n.t('amount') : I18n.t('paidAmount')}
            </Text>
            <View cls="aife flx-row jcfe">
              <Text cls="f-25 orange ff-bold">
                {data && data.amount ? data.amount : '0'}
                {/* <Text style={{ fontSize: 14, color: Colors.check }}>
                  {data && data.amount && data.amount > 1 ? 'Kyats' : 'Kyat'}
                </Text> */}
              </Text>
            </View>
            {data && data.customerName ? (
              <View cls="mt-5 mb-5">
                <Text cls="f-14 black ff-regular asc">{I18n.t('to')}</Text>
                <Text cls="f-16 black ff-medium gray">
                  {data && data.customerName ? data.customerName : ''}
                </Text>
              </View>
            ) : null}

            {/* {data && data.pinCode ? (
              <View style={styles.rowDetail}>
                <Text style={styles.txtLabel}>{I18n.t('pinCode')} : </Text>
                <Text style={styles.txtValue}>{data && data.pinCode}</Text>
                <TouchableOpacity
                  style={{ flex: 1, marginLeft: 5 }}
                  onPress={() => this.copied()}
                >
                  <Image
                    style={{ width: 18, height: 18 }}
                    source={require('../../res/drawable/IconVersion2/copy.jpg')}
                  />
                </TouchableOpacity>
              </View>
            ) : null} */}

            <Button
              text={'backHome'}
              isActive
              onPress={() => this.backHome()}
            />
            <View style={{ height: 10 }} />
            <TouchableOpacity
              cls="width-30 absolute top-10 right-5 aic"
              onPress={() => {
                this.onClose();
                this.props.onBackdropPress && this.props.onBackdropPress();
              }}
            >
              <Icon name="md-close" cls="f-16 orange asc" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
