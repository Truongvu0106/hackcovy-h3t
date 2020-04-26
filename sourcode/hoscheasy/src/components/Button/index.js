import React, { PureComponent } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import I18n from "react-native-i18n";

import { colors, withThemes } from "Root/src/themes";

type Props = {
  text?: string,
  textRaw?: String,
  onPress?: Function,
  textCls?: string,
  border?: boolean,
  styleCls?: Object,
  textStyle?: Object,
  isDeactive: boolean,
  gradient?: boolean
};

@withThemes
export default class extends PureComponent<Props> {
  static defaultProps = {
    border: false,
    isDeactive: false,
    gradient: true,
    numberOfLine: 1
  };

  render() {
    const {
      text,
      onPress,
      textCls,
      numberOfLine,
      border,
      styleCls,
      isDeactive,
      gradient,
      textRaw,
      ...props
    } = this.props;

    const containerCls = [
      { "aic jcc pv-10 bdRadius-5 width-100%": border },
      { "pv-10 bdRadius-5 aic jcc width-100%": !border },
      styleCls && styleCls
    ];
    const childrent = gradient ? (
      isDeactive ? (
        <View cls={[containerCls, "bg-placeHolder"]}>
          <Text
            cls={["ff-medium", { "f-18 white": !textCls }, textCls && textCls]}
            numberOfLines={numberOfLine}
          >
            {textRaw || I18n.t(text)}
          </Text>
        </View>
      ) : (
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={[colors.blueStartGradient, colors.blueEndGradient]}
          cls={containerCls}
        >
          <Text
            cls={["ff-medium", { "f-18 white": !textCls }, textCls && textCls]}
            numberOfLines={numberOfLine}
          >
            {textRaw || I18n.t(text)}
          </Text>
        </LinearGradient>
      )
    ) : (
      <View
        cls={[
          containerCls,
          "bdWidth-1 bdRadius-5 bg-white jcc aic",
          { "bd-orange": !isDeactive, "bd-border": isDeactive }
        ]}
      >
        <Text
          cls={[
            "ff-medium",
            { "f-18 orange": !textCls, border: isDeactive },
            textCls && textCls
          ]}
          numberOfLines={numberOfLine}
        >
          {textRaw || I18n.t(text)}
        </Text>
      </View>
    );
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        cls={containerCls}
        disabled={isDeactive}
        {...props}
      >
        {childrent}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: platform.btnMarket,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  border: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 5
  }
});
