import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TimePickerAndroid,
  StyleSheet
} from 'react-native';

export default class TimePickerDialog extends Component{

  constructor(props){
    super(props);
    this.handleTimePicker = this.handleTimePicker.bind(this);
    this.state = {
      time: null
    }
  }

  static propTypes = {
    /**
     * Time picked handler.
     *
     * This method will be called when the user selected the time from picker
     * The first and only argument is a Date object representing the picked
     * time.
     */
    onTimePicked: PropTypes.func,

    /**
     * Cancelled handler.
     *
     * This method will be called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,
  }

  /**
   * Opens the standard Android time picker dialog.
   *
   * The available keys for the `options` object are:
   *   * `time` (`Date` object or timestamp in milliseconds) - time to show by default
   *
   */
  open(options: Object){
    TimePickerAndroid.open(options).then(this.handleTimePicker);
  }

  handleTimePicker({action, hour, minute}){
    if (action !== TimePickerAndroid.dismissedAction) {
      this.setState({
        time: new Date(1970, 1, 1, hour, minute)
      });
      if(this.props.onTimePicked){
        this.props.onTimePicked(new Date(1970, 1, 1, hour, minute));
      }
    }else if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  getSelectedTime(){
    return this.state.time;
  }

  render(){
    return(
      <View style={styles.container}></View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
