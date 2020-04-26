import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import SafeArea from 'Root/src/components/SafeAreaView';
import { withThemes, appStyleNoNavBar, colors } from 'Root/src/themes';
import images from 'Root/src/assets/images';
import { authLogout } from 'Root/src/store/actions/auth';
import CustomNavbar from 'Root/src/components/HeaderCustom';
import Timeline from 'react-native-timeline-listview';
import ModalGuide from 'Root/src/components/ModalGuide';
import options from './options';

// import NotifiUpdate from "./Notifiupdate";

@connect((_) => ({ profile: _.auth.profile, locale: _.locale }), {
  authLogout
})
@withThemes
export default class TabMore extends React.Component {
  static navigatorStyle = appStyleNoNavBar;
  state = {
    isShowModal: false
  };

  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.modalGuide = React.createRef();

    this.data = [
      {
        time: '8h00',
        title: 'Phòng khám mắt',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        address: 'P405 khu A',
        imageDoctor: images.doctor1,
        nameDoctor: 'BS. Nguyên',
        circleColor: "#00B8F4",
        lineColor: "#00B8F4",
        remainingTime: "15 ph",
        remainingPeople: "0"
      },
      {
        time: '8h20',
        title: 'Phòng điện tim',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        address: 'P406 khu A',
        imageDoctor: images.doctor2,
        nameDoctor: 'BS. Nam',
        remainingTime: "20 ph",
        remainingPeople: "3"
      },
      {
        time: '8h50',
        title: 'Phòng siêu âm',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        address: 'P401 khu B',
        imageDoctor: images.doctor3,
        nameDoctor: 'BS. Mai',
        remainingTime: "30 ph",
        remainingPeople: "2"
      },
      {
        time: '9h25',
        title: 'Phòng chụp X-quang',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        address: 'P403 khu B',
        imageDoctor: images.doctor4,
        nameDoctor: 'BS. Cường',
        remainingTime: "5 ph",
        remainingPeople: "4"
      },
      {
        time: '9h35',
        title: 'Phòng tai mũi họng',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        address: 'P402 khu B',
        imageDoctor: images.doctor5,
        nameDoctor: 'BS. Tiến',
        remainingTime: "10 ph",
        remainingPeople: "5"
      }
    ];
    this.state = {
      selected: null
    };
  }

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{' '}
          {this.state.selected.time}
        </Text>
      );
  }

  openGuide = () => {
    this.modalGuide &&
      this.modalGuide.current &&
      this.modalGuide.current.onOpen();
  };

  renderDetail(rowData, sectionID, rowID) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.title]}>{rowData.title}</Text>
        <View style={styles.descriptionContainer}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Image
              source={rowData && rowData.imageDoctor}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 14, marginTop: 3, color: colors.newText }}>{rowData && rowData.nameDoctor}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={images.clock} style={{ width: 14, height: 14 }} />
              <Text style={[styles.textDescription]}>{`Mất: ${rowData && rowData.remainingTime}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Image source={images.people} style={{ width: 14, height: 14 }} />
              <Text style={[styles.textDescription]}>{`Số người còn chờ: ${rowData && rowData.remainingPeople}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Image source={images.place} style={{ width: 14, height: 14 }} />
              <Text style={[styles.textDescription]}>{rowData && rowData.address}</Text>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: colors.blueStartGradient, padding: 6, borderRadius: 5, width: '60%', alignItems: 'center', marginTop: 5 }}
              onPress={() => this.openGuide()}
              >
              <Text style={{ color: "white", fontWeight: "500" }}>Xem vị trí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _goScreen(screen: string, passProps = {}) {
    this.props.navigator.push({
      screen,
      navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true },
      passProps
    });
  }

  render() {
    return (
      <SafeArea gradient>
        <CustomNavbar title="shedule" {...this.props} />
        <View cls="flx-i bg-white p-10">
          <Timeline
            style={styles.list}
            data={this.data}
            circleSize={20}
            circleColor={colors.newBorder}
            lineColor={colors.newBorder}
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: colors.blueEndGradient,
              color: 'white',
              padding: 5,
              borderRadius: 13
            }}
            descriptionStyle={{ color: 'gray' }}
            options={{
              style: { paddingTop: 5 }
            }}
            innerCircle={'icon'}
            renderDetail={this.renderDetail}
          />
        </View>
        <ModalGuide ref={this.modalGuide} />
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
    alignItems: 'center',
    padding: 8
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: 8
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});
