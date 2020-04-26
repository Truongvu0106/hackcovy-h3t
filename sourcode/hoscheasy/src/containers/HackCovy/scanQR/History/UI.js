import React from "react";
import { View, Text, FlatList } from "react-native";
import { withThemes } from "Root/src/themes";
import Section from "./Section";
import I18n from "react-native-i18n";
import { deviceWidth } from "Root/src/utils/UIHelper";

@withThemes
export default class UI extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View cls="bg-white flx-i">
        {data && data.length !== 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }) => <Section data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View cls="flx-i jcc aic">
            <Text cls="f-14 ">
              {I18n.t("notFoundAgent")}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
