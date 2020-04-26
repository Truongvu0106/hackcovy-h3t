import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { withThemes, colors, appStyleNoNavBar } from 'Root/src/themes';
import { connect } from 'react-redux';
import SafeArea from 'Root/src/components/SafeAreaView';
import { authMarkLogin } from 'Root/src/store/actions/auth';
import { markQuickLogin } from 'Root/src/store/actions/common';
import images from 'Root/src/assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ModalScan from 'Root/src/containers/HackCovy/scanQR/UI/ModalScan';
import ModalGuide from 'Root/src/components/ModalGuide';

@connect(
  (_) => ({
    cacheUser: _.cacheUser,
    device: _.device
  }),
  {
    authMarkLogin,
    markQuickLogin
  }
)
@withThemes
export default class Login extends React.Component<> {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalGuide = React.createRef();
  }

  goScreen(name) {
    this.props.navigator.push({
      screen: name,
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
    });
  }

  componentDidMount() {}

  testOpenModalSuccess() {
    // const obj = {
    //   isSuccess: true,
    // };
    // this.refs.modalScan.onOpen(obj);
  }

  openGuide = () => {
    this.modalGuide &&
      this.modalGuide.current &&
      this.modalGuide.current.onOpen();
  };

  render() {
    return (
      <SafeArea gradient>
        <ScrollView cls="flx-i bg-whiteBold">
          <View cls="flx-i">
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[colors.blueStartGradient, colors.blueEndGradient]}
              cls="height-120 aic jcc"
            >
              <Image cls="width-80 height-80" source={images.logo_home} />
            </LinearGradient>

            <View cls="flx-i bg-whiteBold">
              <View
                cls="flx-row bg-white"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  shadowColor: '#999999',
                  shadowOffset: { width: 3, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  height: 100
                }}
              >
                <View cls="flx-i flx-row ml-3">
                  <Image
                    source={images.doctor2}
                    cls="width-40 height-40 bdRadius-20"
                    resizeMode="contain"
                  />
                  <View cls="ml-3">
                    <Text
                      cls="f-14 b"
                      style={{ maxWidth: 120 }}
                      numberOfLines={1}
                    >
                      P. Điện tim
                    </Text>
                    <Text
                      cls="f-12 mt-5 newText"
                      style={{ maxWidth: 120 }}
                      numberOfLines={2}
                    >
                      Còn 2ph nữa là đến giờ khám của bạn
                    </Text>
                  </View>
                </View>
                <Image source={images.ic_next} cls="width-16 height-35" />
                <View cls="flx-i flx-row ml-5">
                  <Image
                    source={images.doctor3}
                    cls="width-40 height-40 bdRadius-20"
                    resizeMode="contain"
                  />
                  <View cls="ml-3">
                    <Text
                      cls="f-14 b"
                      style={{ maxWidth: 120 }}
                      numberOfLines={1}
                    >
                      P. Siêu âm
                    </Text>
                    <Text
                      cls="f-12 mt-5 newText"
                      style={{ maxWidth: 120 }}
                      numberOfLines={2}
                    >
                      Còn 25ph nữa là đến giờ khám của bạn
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  shadowColor: '#999999',
                  shadowOffset: { width: 3, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                  justifyContent: 'space-between',
                  padding: 5,
                  height: 40,
                  marginTop: 1,
                  flexDirection: 'row'
                }}
                onPress={() => this.goScreen('listHackCovy')}
              >
                <View cls="flx-row aic">
                  <Image
                    source={images.calendar}
                    cls="width-30 height-30 ml-5"
                  />
                  <Text cls="ml-10">Xem lịch đầy đủ</Text>
                </View>
                <View cls="aic jcc">
                  <Image
                    source={images.ic_next}
                    cls="width-20 height-20 ml-5"
                  />
                </View>
              </TouchableOpacity>
              <View cls="height-16" />
              <View cls="flx-row ph-16 jcsb">
                <TouchableOpacity
                  style={styles.card}
                  cls="bdRadius-8 pt-14 pb-12 bgColor-#fff width-48%"
                  onPress={() => this.goScreen('scanHackCovy')}
                >
                  <Image cls="width-80 height-80" source={images.myqr} />
                  <Text cls="f-14 fw-4 mt-25 newText b">Scan QR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.card}
                  cls="bdRadius-8 pt-14 pb-12 bgColor-#fff  width-48%"
                  onPress={() => this.goScreen('myQr')}
                >
                  <Image cls="width-80 height-80" source={images.scan_qr} />
                  <Text cls="f-14 fw-4 mt-25 newText b">Mã QR của tôi</Text>
                </TouchableOpacity>
              </View>
              <View cls="height-16" />
              <View cls="ph-16">
                <TouchableOpacity
                  style={styles.card}
                  cls="flx-i flx-row p-8 bgColor-#fff"
                  onPress={() => this.openGuide()}
                >
                  <Image cls="width-24 height-24" source={images.ic_show_map} />
                  <View cls="width-14" />
                  <Text cls="f-16 newText">Xem sơ đồ bệnh viện</Text>
                </TouchableOpacity>
              </View>
              <View cls="height-16" />
              <Text cls="f-16 ph-20">Cần hỗ trợ?</Text>
              <View cls="height-16" />
              <View cls="flx-row jcsb ph-16 width-100% mb-10">
                <TouchableOpacity
                  style={styles.card}
                  cls="flx-i flx-row p-8 bgColor-#fff mr-4"
                  onPress={() => {}}
                >
                  <Image cls="width-20 height-20" source={images.ic_question} />
                  <View cls="width-14" />
                  <Text cls="f-16 newText">FAQs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.card}
                  cls="flx-i flx-row p-8 bgColor-#fff ml-4"
                  onPress={() => {}}
                >
                  <Image
                    cls="width-20 height-20"
                    source={images.ic_discussion}
                  />
                  <View cls="width-16" />
                  <Text cls="f-16 fw-4 newText">Hotline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ModalScan
            ref="modalScan"
            onClose={() => this.goScreen('listHackCovy')}
          />
          <ModalGuide ref={this.modalGuide} />
        </ScrollView>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#999999',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
