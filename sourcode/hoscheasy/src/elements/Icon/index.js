// /** @flow **/
/** @format **/
import React from 'react';
// import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import iconAwesomeGlyphMap from 'react-native-vector-icons/glyphmaps/FontAwesome5Free.json';
import iconIonicGlyphMap from 'react-native-vector-icons/glyphmaps/Ionicons.json';

import ViettelIcons, { glyphMap as viettelGlyphMap } from './viettelicon';

/**
 * Use fontAwesome for Default Font Icon
 */
const DEFAULT_OPTIONS = {
  fontName: 'FontAwesome',
  color: '#000000',
  fontSize: 30
};

const IONIC_OPTIONS = {
  fontName: 'Ionicons',
  color: '#000000',
  fontSize: 30
};
const VIETTELICONS_OPTIONS = {
  fontName: 'ViettelIcons',
  color: '#000000',
  fontSize: 24
};

const GLYPH_MAPS = {
  [DEFAULT_OPTIONS.fontName]: iconAwesomeGlyphMap,
  [IONIC_OPTIONS.fontName]: iconIonicGlyphMap,
  [VIETTELICONS_OPTIONS.fontName]: viettelGlyphMap
};

export const getIcon = (iconName, options) => {
  const props = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  const glyphMap = GLYPH_MAPS[props.fontName];
  if (glyphMap) {
    props.glyph = String.fromCharCode(glyphMap[iconName]);
    return props;
  }
};

type Props = {
  name: string,
  size: number,
  color: string,
  style: Object
};

export default class Icons extends React.PureComponent<Props> {
  render() {
    const Component = viettelGlyphMap[this.props.name]
      ? ViettelIcons
      : IonIcons;
    return <Component {...this.props} />;
  }
}
