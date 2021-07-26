import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class PayNow extends React.Component {
  render() {
    return (
      <View>
        <Text>PayNow</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, {})(PayNow);
