import React, { Component } from "react";
import { Text, View } from "react-native";
import { withThemes } from "Root/src/themes";

const defaultColors = [
  "#2ecc71", // emerald
  "#3498db", // peter river
  "#8e44ad", // wisteria
  "#e67e22", // carrot
  "#e74c3c", // alizarin
  "#1abc9c", // turquoise
  "#2c3e50" // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}
@withThemes
export default class UserAvatar extends Component {
  render() {
    const { name } = this.props;
    let i = sumChars(name) % defaultColors.length;
    let background = defaultColors[i];
    return (
      <View cls="flx-i jcc aic">
        <View
          style={{ backgroundColor: `${background}` }}
          cls="height-40 width-40 bdRadius-20 jcc aic"
        >
          <Text cls="contactAvatarName">{name}</Text>
        </View>
      </View>
    );
  }
}
