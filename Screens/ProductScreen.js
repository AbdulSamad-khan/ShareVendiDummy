import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemCart, increaseQuantity, decreaseQuantity} from '../actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {set} from 'react-native-reanimated';

const ProductScreen = props => {
  const [data, setData] = useState('');
  const id = props.navigation.getParam('id');
  const products = props.navigation.getParam('products');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state);

  const cartItem = item => {
    dispatch(addItemCart(item));
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={products.filter(product => {
          return product.item_cat === id;
        })}
        contentContainerStyle={styles.list}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ProductDetailScreen')}>
              <Image
                style={{height: 120, width: 120, marginTop: 10}}
                source={{uri: itemData.item.image_url}}
              />
            </TouchableOpacity>
            {cartItems.cart.some(product => {
              return product.item_id === itemData.item.item_id;
            }) ? (
              <View style={styles.quantityBar}>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(increaseQuantity(itemData.item.item_id))
                  }>
                  <FontAwesome5 size={20} name={'plus'} color="#CD113B" />
                </TouchableOpacity>
                <Text style={styles.icon}>{itemData.item.quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    dispatch(decreaseQuantity(itemData.item.item_id))
                  }>
                  <FontAwesome5
                    size={25}
                    name={'window-minimize'}
                    color="#CD113B"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => cartItem(itemData.item)}
                style={{
                  width: 100,
                  // borderWidth: 1,
                  // borderColor: 'red',
                  alignItems: 'flex-end',
                }}>
                <FontAwesome5 size={35} name={'plus-circle'} color="#CD113B" />
              </TouchableOpacity>
            )}
            <Text style={{width: 100}} numberOfLines={1}>
              {itemData.item.item_name}
            </Text>
            <Text> Price: {itemData.item.item_price}</Text>
          </View>
        )}
        keyExtractor={item => item.item_id}
        numColumns={2}
        horizontal={false}
      />
      <TouchableNativeFeedback
        onPress={() => {
          if (cartItems.cart.length <= 0) {
            alert('Your Cart is Empty');
          } else {
            props.navigation.navigate('CartScreen');
          }
        }}>
        <View style={styles.bottomCartBar}>
          <Text style={styles.bottomTabText}>
            View your Cart Rs.
            {cartItems.cart.reduce((acc, currentVal) => {
              return (
                parseInt(acc) +
                parseInt(currentVal.quantity) * parseInt(currentVal.item_price)
              );
            }, 0)}
          </Text>
        </View>
      </TouchableNativeFeedback>

      {/* Bottom Cart Bar */}
    </View>
  );
};
ProductScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('categoryTitle'),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    alignItems: 'center',
  },
  listItem: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    borderRadius: 10,
  },
  bottomCartBar: {
    backgroundColor: '#CD113B',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomTabText: {
    color: 'white',
  },
  quantityBar: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});
export default ProductScreen;
