import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  DatePickerIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  Modal
} from 'react-native';

export default class TimePickerDialog extends Component{

  constructor(props){
    super(props);

	this.modalKey = `IosTimePickerModal_${Date.now()}`

    this.state = {
      timePickerVisible: false,
      options: null
    }
  }

  static propTypes = {
    /**
     * Time picked handler.
     *
     * This is called when the user selected the time from picker
     * The first and only argument is a Date object representing the picked
     * time.
     */
    onTimePicked: PropTypes.func,

    /**
     * Cancelled handler.
     *
     * This is called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,

    /**
    * Ok button label
    */
    okLabel: PropTypes.string,

    /**
    * Cancel button label
    */
    cancelLabel: PropTypes.string
  }

  static defaultProps = {
    okLabel: 'Ok',
    cancelLabel: 'Cancel'
  }

  /**
 * Opens the standard IOS time picker dialog.
 *
 * The available keys for the `options` object are:
 *   * `time` (`Date` object or timestamp in milliseconds) - time to show by default
 *
 */
  open(options: Object){
    this.setState({
      options: options
    });
    this.showTimePickerModal();
  }

  getSelectedTime(){
    return (options) ? options.time : null;
  }

  cancel = () => {
    this.hideTimePickerModal();
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  ok = () => {
    this.hideTimePickerModal();
    if(this.props.onTimePicked){
      this.props.onTimePicked(this.state.options.time);
    }
  }

  showTimePickerModal(){
    this.setState({
      timePickerVisible: true
    });
  }

  hideTimePickerModal(){
    this.setState({
      timePickerVisible: false
    });
  }

  render(){
    const { locale } = this.props;
    let timePickerProps = {};
    if (this.state.options){
      if(this.state.options.time) {
        timePickerProps.date = this.state.options.time;
      }
    }else{
      timePickerProps.date = new Date();
    }

    return(
      <Modal style={{flex:1}} onRequestClose={() => {}} visible={this.state.timePickerVisible} transparent key={this.modalKey}>
        <View style={styles.container} >
          <View style={styles.background}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.modalContent}>
                <View style={{marginTop: 24, marginLeft: 8, marginRight:8}}>
                  <DatePickerIOS {...timePickerProps}
                    mode="time"
		                locale={locale ? locale : 'en_EN'}
                    onDateChange={(time)=>{
                      let options = this.state.options;
                      options.time = time;
                      this.setState({
                        options: options
                      });
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight style={{flex:1}} onPress={this.cancel.bind(this)} underlayColor={"#57D4E8"}>
                      <View style={{}}><Text style={styles.buttonTextStyle}>{this.props.cancelLabel}</Text></View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1}} onPress={this.ok.bind(this)} underlayColor={"#57D4E8"}>
                      <View style={{}}><Text style={styles.buttonTextStyle}>{this.props.okLabel}</Text></View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    margin: 16
  },
  buttonTextStyle: {
    textAlign:'center',
    fontSize: 16,
    color: '#007AFF'
  }
});
