import { StyleSheet, Platform } from "react-native";
import { build, withTheme as T } from "themes-rn"; // eslint-disable-line

export const colors = {
  orange: "#F36F21",
  orangeBlur: "#fcb26f",
  transparent: "transparent",
  border: "#e2e2e2",
  placeHolder: "#c9c9c9",
  white: "#FFFFFF",
  darkGray: "#999999",
  colorIcon: "#758CA5",
  blue: "#007aff",
  gray: "#a3a3a3",
  red: "#FE4365",
  error: "#EA0029",
  black: "#454f63",
  backBold: "#282c35",
  blueLight: "#00b0ff",
  lightGray: "#d8d8d8",
  holder: "grey",
  green: "#00B200",
  grey: "#282c35",
  blur: "#D6F4FF",
  greenLight: "#64FFDA",
  greenLightBorder: "#1DE9B6",
  gradientBack: "rgba(0,0,0,0.5)",
  gradientWhite: "rgba(255,255,255,0.2)",
  newStartGradientNav: "rgb(255,124,3)",
  subMenu: "rgba(255,124,3,0.1)",
  newEndGradientNav: "rgb(234,47,133)",
  note: "#8e8e93",
  bgInput: "#f1f1f1",
  backDrop: "rgba(0,0,0,0.2)",
  purple: "#5856D6",
  whiteBold: "#f7f8f8",
  hairLine: "#efeef4",
  startInputSearchGradient: "rgb(253,148,59)",
  endInputSearchGradient: "rgb(243,103,135)",
  round: "#EBEDF0",
  newText: "#9696A1",
  newBorder: "#E7E7E7",
  weakGray: "#F5F6F7",
  mauGrayLol: "#A9A9A9", // fu,
  placeHolder2: "#F4F4F4",
  blueStartGradient: "#00B8F4",
  blueEndGradient: "#82E2FB"
};

export const appStyleNoNavBar = {
  navBarHidden: true
};

export const fontFamilys = {
  regular: "Zawgyi-One",
  medium: "Zawgyi-One",
  bold: "Zawgyi-One"
};

export const buildThemes = () => build({ colors, fontFamilys }, StyleSheet);
export const withThemes = T;
