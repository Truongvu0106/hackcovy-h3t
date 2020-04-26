import React from 'react';
import { Vibration } from 'react-native';
import { withThemes, appStyleNoNavBar } from 'Root/src/themes';
import CustomNavbar from 'Root/src/components/HeaderCustom';
import SafeArea from 'Root/src/components/SafeAreaView';
import { connect } from 'react-redux';
import { getMyLocation } from 'Root/src/store/actions/common';
import { checkTurnOnLocationService } from 'Root/src/utils/LocationHelper';
import ModalScan from './UI/ModalScan';
import UI from './UI';

type eventBarCode = {
  bounds: {
    origin: {
      x: string,
      y: string
    },
    size: {
      width: string,
      height: string
    }
  },
  rawData: string,
  data: string,
  target: number,
  type: string
};
@connect(null, {
  getMyLocation
})
@withThemes
export default class ScanQR extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.canScan = true;
    this.state = {
      isFocusScreen: false,
      currentLocations: null
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.getMyLocation((result, error) => {
      if (result) {
        console.log('result', result);
        this.setState({
          currentLocations: result
        });
      }
    });
  }

  getLocation = async () => {
    const turnOnService = await checkTurnOnLocationService();
    if (!turnOnService) {
      this.setState({ currentLocations: null });
    }
  };

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'didAppear': {
        this.getLocation();
        return this.setState(
          { isFocusScreen: true },
          () => (this.canScan = true)
        );
      }

      case 'willDisappear':
      case 'willCommitPreview':
        return this.setState({
          isFocusScreen: false
        });
      default:
        return;
    }
  }

  onBarCodeCanReadIOS = (e: eventBarCode) => {
    if (!this.canScan) {
      return;
    }

    Vibration.vibrate(500);
    this.canScan = false;
    const data = e.data;
    this._handleData(data);
  };

  onBarCodeCanReadAndroid = (e: eventBarCode) => {
    if (!this.canScan) {
      return;
    }

    Vibration.vibrate(500);
    this.canScan = false;
    const data = e.data;
    this._handleData(data);
  };

  _handleData = (data = '') => {
    if (!data || data === '') {
      this.canScan = true;
      return;
    }
    const obj = {
      isSuccess: true
    };
    this.refs.modalScan.onOpen(obj);
  };

  goOut = () => {
    this.setState(
      {
        isFocusScreen: false
      },
      () => (this.canScan = false)
    );
  };

  onClose() {
    this.setState(
      { isFocusScreen: true },
      () => {
        this.canScan = true;
        this.props.navigator.push({
          screen: "listHackCovy",
          navigatorStyle: { ...appStyleNoNavBar, tabBarHidden: true }
        });
      }
    );
  }

  render() {
    const { isFocusScreen } = this.state;
    return (
      <SafeArea gradient goBack>
        <CustomNavbar title="scanQRCovy" {...this.props} />
        <UI
          ref={'UI'}
          {...this.props}
          isFocusScreen={isFocusScreen}
          onBarCodeCanReadAndroid={this.onBarCodeCanReadAndroid}
          onBarCodeCanReadIOS={this.onBarCodeCanReadIOS}
          goOut={this.goOut}
        />
        {isFocusScreen && (
          <ModalScan
            ref="modalScan"
            onClose={() => this.onClose()}
          />
        )}
      </SafeArea>
    );
  }
}
