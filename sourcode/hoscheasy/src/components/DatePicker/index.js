import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

import moment from 'moment';
import I18n from 'react-native-i18n';
import { withThemes, colors } from 'Root/src/themes';
import Button from '../Button';

// import * as calendarSelectors from '~/store/selectors/calendar'
// import * as calendarActions from '~/store/actions/calendar'

@withThemes
export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStartVisible: false,
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  onDateStartFocus() {
    this.setState({
      dateStartVisible: true
    });
  }

  onDateStartCancel() {
    this.setState({
      dateStartVisible: false
    });
  }

  setDateStart(value) {
    this.setState({
      selectedDate: value
    });
  }

  onOpen() {
    this.setState({ dateStartVisible: true });
  }

  onConfirm() {
    const { onSelected, input } = this.props;
    const { selectedDate } = this.state;
    const date = moment(selectedDate).format('DD/MM/YYYY');

    input && input.onChange(date);
    onSelected && onSelected(date);
    this.setState({ dateStartVisible: false });
  }

  onClose() {
    this.setState({ dateStartVisible: false });
  }

  render() {
    const { selectedDate, dateStartVisible } = this.state;
    const { title } = this.props;
    return (
      <Modal
        isVisible={dateStartVisible}
        onBackdropPress={() => this.onClose()}
      >
        <View cls="flx-i">
          <TouchableOpacity
            cls="flx-i"
            onPress={() => this.onClose()}
            activeOpacity={1}
          />
          <View
            cls="flex-2 bg-white jcc"
            style={{ borderWidth: 1, borderRadius: 10 }}
          >
            <View cls="flx-i jcc">
              <Text cls="f-18 black asc ff-regular">{I18n.t(title)}</Text>
            </View>
            <View cls="flex-3 jcc aic">
              <DatePicker
                date={selectedDate}
                mode={'date'}
                locale="en"
                maximumDate={new Date()}
                onDateChange={this.setDateStart.bind(this)}
              />
            </View>
            <View cls="flx-i jcc">
              <Button
                text="confirm"
                styleCls="width-150 asc"
                onPress={() => this.onConfirm()}
              />
            </View>
          </View>
          <TouchableOpacity
            cls="flx-i"
            onPress={() => this.onClose()}
            activeOpacity={1}
          />
        </View>
      </Modal>
    );
  }
}
