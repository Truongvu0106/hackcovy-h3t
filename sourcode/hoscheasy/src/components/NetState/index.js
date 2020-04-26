import React, { Component } from "react";
import { View, Text, NetInfo } from "react-native";
import store from "Root/src/store";
import { checkNetwork } from "Root/src/store/actions/common";
// import NetInfo from "@react-native-community/netinfo";

export default class NetState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    const { onHandleChange } = this.props;
    store.dispatch(checkNetwork(isConnected));
    onHandleChange && onHandleChange(isConnected)
  };

  render() {
    return null;
  }
}
