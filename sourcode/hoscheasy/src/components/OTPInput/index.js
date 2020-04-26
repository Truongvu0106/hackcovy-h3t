import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {
  ViewStyle,
  TextStyle
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import _ from 'lodash';
import { withThemes } from 'Root/src/themes';

type Props = {
  codeLength: number,
  inputPosition: string,
  size: number,
  space: number,
  className: string,
  cellBorderWidth: number,
  activeColor: string,
  inactiveColor: string,
  autoFocus: boolean,
  codeInputStyle: TextStyle,
  containerStyle: ViewStyle,
  onFulfill?: Function,
  maxLength: number
};

@withThemes
export default class ConfirmationInput extends Component<Props> {
  static defaultProps = {
    codeLength: 6,
    inputPosition: 'center',
    autoFocus: true,
    size: 40,
    className: 'border-box',
    cellBorderWidth: 1,
    activeColor: 'rgb(0,179,255)',
    inactiveColor: 'rgb(0,179,255)',
    space: 8,
    maxLength: 1
  };

  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    };

    this.codeInputRefs = [];
    this.timeout = null;
  }

  componentDidMount() {
    const { inputPosition, autoFocus } = this.props;

    if (
      _.indexOf(['center', 'left', 'right', 'full-width'], inputPosition) === -1
    ) {
      console.error(
        'Invalid input position. Must be in: center, left, right, full'
      );
    }

    if (autoFocus) {
      this.timeout = setTimeout(() => {
        this._setFocus(0);
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  clearValue = () => {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    });
  };

  clear() {
    this.setState(
      {
        codeArr: new Array(this.props.codeLength).fill(''),
        currentIndex: 0
      },
      () => {
        this._setFocus(0);
      }
    );
  }

  _setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  _blur(index) {
    this.codeInputRefs[index].blur();
  }

  _onFocus(index) {
    const newCodeArr = _.clone(this.state.codeArr);
    const { getError } = this.props;
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }
    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    });
    if (getError) {
      getError && getError(newCodeArr.join(''));
    }
  }

  _getContainerStyle(size, position) {
    switch (position) {
      case 'left':
        return {
          justifyContent: 'flex-start',
          height: size
        };
      case 'center':
        return {
          justifyContent: 'center',
          height: size
        };
      case 'right':
        return {
          justifyContent: 'flex-end',
          height: size
        };
      default:
        return {
          justifyContent: 'space-between',
          height: size
        };
    }
  }

  _getInputSpaceStyle(space) {
    const { inputPosition } = this.props;
    switch (inputPosition) {
      case 'left':
        return {
          marginRight: space
        };
      case 'center':
        return {
          marginRight: space / 2,
          marginLeft: space / 2
        };
      case 'right':
        return {
          marginLeft: space
        };
      default:
        return {
          marginRight: 0,
          marginLeft: 0
        };
    }
  }

  _getClassStyle(className, active) {
    const { cellBorderWidth, activeColor, inactiveColor, space } = this.props;
    const classStyle = {
      ...this._getInputSpaceStyle(space)
    };

    switch (className) {
      case 'clear':
        return _.merge(classStyle, { borderWidth: 0 });
      case 'border-box':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case 'border-circle':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderRadius: 50,
          borderColor: active ? activeColor : inactiveColor
        });
      case 'border-b':
        return _.merge(classStyle, {
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case 'border-b-t':
        return _.merge(classStyle, {
          borderTopWidth: cellBorderWidth,
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      case 'border-l-r':
        return _.merge(classStyle, {
          borderLeftWidth: cellBorderWidth,
          borderRightWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor
        });
      default:
        return className;
    }
  }

  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      // Return if duration between previous key press and backspace is less than 20ms
      if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) < 20) return;
      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this._setFocus(nextIndex);
    } else {
      // Record non-backspace key event time stamp
      this.lastKeyEventTimestamp = e.timeStamp;
    }
  }

  _onInputCode(character, index) {
    const { codeLength, onFulfill, getError } = this.props;
    if (!/^[\d]{1}$/g.test(character)) {
      return;
    }
    const newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;
    this.setState(prevState => ({
      codeArr: newCodeArr,
      currentIndex: prevState.currentIndex + 1
    }));
    if (getError) {
      getError && getError(newCodeArr.join(''));
    }
    if (index === codeLength - 1) {
      const code = newCodeArr.join('');
      onFulfill && onFulfill(code);
      return;
    }
    this._setFocus(this.state.currentIndex + 1);

    this.setState(prevState => ({
      codeArr: newCodeArr
    }));
  }
  render() {
    const {
      codeInputStyle,
      containerStyle,
      inputPosition,
      className,
      size,
      notHeight
    } = this.props;

    const initialCodeInputStyle = {
      width: size,
      height: notHeight ? null : size
    };

    return (
      <View
        cls="flx-i flx-row jcc aic"
        style={[this._getContainerStyle(size, inputPosition), containerStyle]}
      >
        {this.state.codeArr.map((item, index) => (
          <TextInput
            key={index}
            ref={ref => (this.codeInputRefs[index] = ref)}
            cls={[
              'tc bg-bgInput bdRadius-6 mr-5 ff-medium f-24 backBold pv-2',
              `bd-${this.state.currentIndex === index ? 'orange' : 'bgInput'}`
            ]}
            style={[
              initialCodeInputStyle,
              this._getClassStyle(className, this.state.currentIndex === index),
              codeInputStyle
            ]}
            underlineColorAndroid="transparent"
            // selectionColor={activeColor}
            keyboardType={'number-pad'}
            returnKeyType={'done'}
            {...this.props}
            autoFocus={false}
            onFocus={() => this._onFocus(index)}
            value={
              this.state.codeArr[index]
                ? this.state.codeArr[index].toString()
                : ''
            }
            onChangeText={text => this._onInputCode(text, index)}
            onKeyPress={e => this._onKeyPress(e)}
            maxLength={1}
            caretHidden
          />
        ))}
      </View>
    );
  }
}
