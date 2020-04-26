import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  PermissionsAndroid
} from "react-native";
import Contacts from "react-native-contacts";
import LinearGradient from "react-native-linear-gradient";
import I18n from "react-native-i18n";
import ValidateRegex from "Root/src/utils/ValidateRegex";
import { isIOS } from "Root/src/utils/iPhoneXHelper";
import InputSearch from "Root/src/components/InputSearch";
import { withThemes, colors } from "Root/src/themes";
import Icons from "Root/src/elements/Icon";
import SafeArea from "Root/src/components/SafeAreaView";
import Item from "./Item";

const contactPermission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
@withThemes
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullContacts: [],
      renderContacts: []
    };
  }

  componentDidMount() {
    if (!isIOS) {
      this.requestContactPermission();
    } else {
      try {
        this.getContacts();
      } catch (error) {
        console.log("errrrr", error);
      }
    }
  }

  async requestContactPermission() {
    try {
      const granted = await PermissionsAndroid.request(contactPermission);
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        granted === PermissionsAndroid.RESULTS.AUTHORIZED
      ) {
        this.getContacts();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  }

  getContacts() {
    Contacts.getAll((err, contacts) => {
      console.log("contact", contacts);
      const fullContacts = [];
      if (!contacts || (contacts && contacts.length <= 0)) {
        return;
      }
      contacts.forEach(item => {
        const { givenName, phoneNumbers, familyName } = item;
        if (phoneNumbers && phoneNumbers.length <= 0) return;

        const contact = {};

        contact.fullName = givenName && givenName.trim();
        contact.fullName += ` ${familyName && familyName.trim()}`;

        contact.phone =
          phoneNumbers && phoneNumbers.length > 0 && phoneNumbers[0].number;

        const arrShortName = (contact.fullName &&
          contact.fullName !== "" &&
          contact.fullName.split(" ")) || [""];

        let shortName = "";
        arrShortName.forEach(char => {
          if (char[0] !== undefined) {
            shortName += char[0];
          }
        });
        contact.shortName = shortName;
        fullContacts.push(contact);
      });
      this.setState({ fullContacts, renderContacts: fullContacts });
    });
  }

  searchContact = text => {
    const { fullContacts } = this.state;

    this.timeOut && clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      const keyWord = text.toLowerCase().split(" ");

      const renderContacts = fullContacts.filter(
        item =>
          keyWord.every(
            key =>
              (item.phone &&
                item.phone.replace(ValidateRegex.ONLY_NUMBER, "").indexOf(key) >
                  -1) ||
              (item.fullName && item.fullName.toLowerCase().indexOf(key) > -1)
          )
        // alert(item.phone)
      );
      this.setState({ renderContacts });
    }, 200);
  };

  dismisKeyBoard() {
    Keyboard.dismiss();
  }

  back = () => {
    this.props.navigator.pop();
  };

  onChooseContact = item => {
    const { onCheckValue, navigator } = this.props;
    item.phone = item.phone.replace(ValidateRegex.ONLY_NUMBER, "");
    onCheckValue && onCheckValue(item);
    navigator && navigator.pop();
  };

  renderItem = ({ item }) => (
    <Item item={item} onChooseContact={this.onChooseContact} />
  );

  render() {
    const { renderContacts } = this.state;
    return (
      <SafeArea gradient>
        <View cls="flx-i bg-white">
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[colors.newStartGradientNav, colors.newEndGradientNav]}
          >
            <TouchableWithoutFeedback onPress={this.dismisKeyBoard}>
              <View cls="width-100% jcsb aic ph-16 mb-16">
                <View cls="flx-row jcsb width-100% aic">
                  <TouchableOpacity
                    cls="width-44 height-44 jcc"
                    onPress={this.back}
                  >
                    <Icons name="ios-arrow-round-back" size={35} color={colors.white} />
                  </TouchableOpacity>
                  <Text cls="f-17 b white">{I18n.t("contact")}</Text>
                  <View cls="width-44 height-44" />
                </View>
                <InputSearch isContact search={this.searchContact} />
              </View>
            </TouchableWithoutFeedback>
          </LinearGradient>
          <FlatList
            onChooseContact={this.onChooseContact}
            data={renderContacts}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </SafeArea>
    );
  }
}
