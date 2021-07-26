import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableNativeFeedback,
  Button,
} from 'react-native';
import Checkout from 'react-native-foree-checkout';
// action creator
import {deleteCartItem} from '../actions';
import {connect} from 'react-redux';

class CartScreen extends React.Component {
  renderText = true; // flag to check the condition
  constructor(props) {
    super(props);
    this.getResponse = this.getResponse.bind(this); // bind a method getResponse to use this keyword in a function
  }
  responseState = {
    status: '',
    ref_number: '',
    message: '',
  };

  state = {
    key: 'c74f4eb2-f1dc-4b44-876c-55b44299a27e',
    amount: '',
    is_generated: true,
    reference_number: '13673300002620',
    // customer_email_address: 'vendi@mailinator.com',
    // customer_phone_number: '03350217057',
    // customer_name: '',
    token: '',
    is_testing: true,
    create_bill: true,
  };
  onButtonPress() {
    this.writeData();
    this.render();
  }
  go = () => {
    this.renderText = false;
    this.onButtonPress();
  };

  writeData = () => {
    this.setState({
      key: this.state.key,
      amount: this.state.amount,
      is_generated: this.state.is_generated,
      reference_number: this.state.reference_number,
      customer_email_address: this.state.customer_email_address,
      customer_phone_number: this.state.customer_phone_number,
      customer_name: this.state.customer_name,
      token: this.state.token,
    });
  };
  getResponse(response) {
    this.renderText = true;
    var responseData = JSON.parse(response);
    this.responseState.status = responseData.status;
    if (this.responseState.status == 1) {
      this.setState({
        key: '',
        amount: '',
        is_generated: '',
        reference_number: '',
        customer_email_address: '',
        customer_phone_number: '',
        customer_name: '',
        token: '',
      });
    }
    this.responseState.ref_number = responseData.reference_number;
    this.responseState.message = responseData.message;
    this.forceUpdate();
  }

  // helper function for flatlist
  renderItem = itemData => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItem}>
          <Text style={styles.cartItemText}>{itemData.item.quantity}.</Text>
          <Image
            source={{
              uri: itemData.item.image_url,
            }}
            style={{width: 40, height: 40}}
          />
          <View>
            <Text
              style={{...styles.cartItemText, width: 150}}
              numberOfLines={1}>
              {itemData.item.item_name}
            </Text>
          </View>
          <Text style={styles.cartItemText}>{itemData.item.item_price}</Text>
          <TouchableNativeFeedback
            onPress={() => this.props.deleteCartItem(itemData.item.item_id)}>
            <Text
              style={{
                ...styles.cartItemText,
                color: 'red',
              }}>
              x
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };
  componentDidMount = () => {
    const totalAmount = this.props.cart.reduce((acc, currentVal) => {
      return (
        parseInt(acc) +
        parseInt(currentVal.quantity) * parseInt(currentVal.item_price)
      );
    }, 0);
    this.setState({amount: totalAmount});
  };
  // componentDidMount runs whenever props and state changes of component
  componentDidUpdate = () => {
    if (this.props.cart.length <= 0) {
      this.props.navigation.goBack();
    }
  };
  render() {
    this.props.cart.length;
    if (this.renderText) {
      return (
        <View style={styles.screen}>
          <FlatList
            data={this.props.cart}
            renderItem={this.renderItem}
            keyExtractor={item => item.item_id}
          />
          <View style={styles.detailsContainer}>
            <Text style={{margin: 10, ...styles.cartItemText}}>
              Sub Total :
              {this.props.cart.reduce((acc, currentVal) => {
                return (
                  parseInt(acc) +
                  parseInt(currentVal.quantity) *
                    parseInt(currentVal.item_price)
                );
              }, 0)}
            </Text>
            <Text style={{margin: 10, ...styles.cartItemText}}>
              Discount : 100
            </Text>

            <Button
              color="#CD113B"
              style={{margin: 10, ...styles.cartItemText}}
              title="checkout"
              onPress={this.go.bind(this)}
            />
          </View>
        </View>
      );
    } else if (!this.renderText) {
      return <Checkout data={this.state} response={this.getResponse} />;
    }
  }
}
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  cartItemContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  cartItem: {
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    width: '90%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cartItemText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailsContainer: {
    width: '90%',
    marginTop: 30,
    height: 200,
  },
});
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, {deleteCartItem})(CartScreen);
