import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';
// import * as calendarSelectors from '~/store/selectors/calendar'
// import * as calendarActions from '~/store/actions/calendar'

@withThemes
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date(),
      dateStartVisible: false,
      selectedDate: null
    };
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
    const { input, onSelected } = this.props;
    const date = moment(value).format('DD/MM/YYYY');
    onSelected && onSelected(value);
    input && input.onChange(value);

    this.setState({
      dateStartVisible: false,
      selectedDate: date
    });
  }

  render() {
    const { selectedDate } = this.state;
    const { title, placeholder } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.inputField}
          onPress={this.onDateStartFocus.bind(this)}
        >
          <View cls="mb-5 aic flx-row jcsb">
            <Text cls={(!!selectedDate && 'black f-14') || 'darkGray f-14'}>
              {selectedDate || I18n.t(placeholder)}
            </Text>

            <View cls="flx-row aic jcc">
              <Icon name="md-calendar" cls="f-20 darkGray" />
              {/* {(!!selectedDate && (
                <Icon name="md-checkmark-circle" cls="f-16 green pl-10 pb-2" />
              )) ||
                null} */}
            </View>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          maximumDate={new Date()}
          titleIOS={I18n.t(title)}
          titleStyle={{ color: '#000' }}
          confirmTextIOS={I18n.t('confirm')}
          cancelTextIOS={I18n.t('cancel')}
          datePickerModeAndroid="default"
          isVisible={this.state.dateStartVisible}
          onConfirm={this.setDateStart.bind(this)}
          onCancel={this.onDateStartCancel.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  inputField: {
    // borderRadius: 5,
    backgroundColor: '#ffffff',
    // height: 40,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  container: {
    // overflow: 'hidden',
    borderBottomColor: colors.border,
    borderBottomWidth: 1
    // borderRadius: 5
  }
};
