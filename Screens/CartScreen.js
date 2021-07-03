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
import {deleteCartItem} from '../actions';
import {useSelector, useDispatch} from 'react-redux';
const CartScreen = () => {
  const cartItems = useSelector(state => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();
  const renderItem = itemData => {
    console.log('hello');
    console.log(itemData.item.quantity);
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItem}>
          <Text style={styles.cartItemText}>{itemData.item.quantity}.</Text>
          <Image
            source={{
              uri: itemData.item.imageUrl,
            }}
            style={{width: 40, height: 40}}
          />
          <View>
            <Text style={styles.cartItemText}>{itemData.item.title}</Text>
          </View>
          <Text style={styles.cartItemText}>{itemData.item.price}</Text>
          <TouchableNativeFeedback
            onPress={() => dispatch(deleteCartItem(itemData.item.id))}>
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
  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.detailsContainer}>
        <Text style={{margin: 10, ...styles.cartItemText}}>
          Sub Total :
          {cartItems.reduce((acc, currentVal) => {
            return (
              parseInt(acc) +
              parseInt(currentVal.quantity) * parseInt(currentVal.price)
            );
          }, 0)}
        </Text>
        <Text style={{margin: 10, ...styles.cartItemText}}>Discount : 100</Text>
        <Button
          color="#CD113B"
          style={{margin: 10, ...styles.cartItemText}}
          title="checkout"
        />
      </View>
    </View>
  );
};
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
export default CartScreen;
