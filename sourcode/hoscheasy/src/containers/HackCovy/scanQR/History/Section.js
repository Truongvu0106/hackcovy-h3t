import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList
} from "react-native";
import { withThemes, colors, fontFamilys } from "Root/src/themes";
import images from "Root/src/assets/images";
import Icons from "Root/src/elements/Icon";
import moment from "moment";
import { deviceWidth } from "Root/src/utils/UIHelper";
import I18n from 'react-native-i18n';
@withThemes
export default class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    const { data } = this.props;
    const { show } = this.state;
    const firstItem = data.date[0];
    return (
      <View cls={["flx-i"]}>
        <TouchableOpacity cls={["flx-row width-100% height-72 pt-4 pl-16"]} onPress={this.toggleShow}>
          <Image source={images.avatar} cls="width-42 height-42 asc" />
          <View
            cls={["jcsb flx-i flx-row aic bdbWidth-1  ml-12"]}
            style={{ borderColor: "#C9C9C9" }}
          >
            <View cls={["jcfs"]}>
              <Text cls={["f-16 fw5"]}>{data.name}</Text>
              <Text>{data.phone}</Text>
            </View>
            <View cls="flx-row mt-28 mr-16 aic">
              <Text>{moment(firstItem).format("DD/MM")}</Text>
              <View onPress={this.toggleShow}>
                <Icons
                  name={show ? "ios-arrow-up" : "ios-arrow-down"}
                  cls="f-24 note ml-12"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {show && (
          <View cls={`width-${deviceWidth} bg-weakGray`}>
            <View cls={`mh-${Platform.OS === 'android' ? (deviceWidth - 300) / 2 : (deviceWidth - 330) / 2}`}
            >
              <FlatList
                numColumns={3}
                data={data.date}
                renderItem={({ item, index }) => <Item data={item} />}
                cls={["m-4"]}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
  toggleShow = () => {
    this.setState({
      show: !this.state.show
    });
  };
}

@withThemes
class Item extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View
        cls={[`bdWidth-1 bdRadius-16 m-4 pv-4 width-${Platform.OS === 'android' ? 92 : 102} aic jcc`]}
        onLayout={(event)=>console.log('event',event.nativeEvent.layout.width)}
        style={{ borderColor: colors.newText }}
      >
        <Text cls="f-12 newText">
          {moment(data).format("DD/MM") + " at " + moment(data).format("HH:mm")}
        </Text>
      </View>
    );
  }
}
