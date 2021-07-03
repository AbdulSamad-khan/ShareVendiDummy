import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItemCart, increaseQuantity, decreaseQuantity} from '../actions';
const products = [
  {
    categoryId: 1,
    id: 1,
    title: 'Lays chips',
    price: '50 Rs',
    description: 'A nice Snack',
    imageUrl:
      'https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg',
  },
  {
    categoryId: 1,
    id: 2,
    title: 'Kurkure',
    price: '150 Rs',
    description: 'A nice Snack',
    imageUrl:
      'https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/1/1138847-1.jpg',
  },
  {
    categoryId: 2,
    id: 3,
    title: 'Coca Cola',
    price: '50 Rs',
    description: 'A popular soft drink',
    imageUrl:
      'https://pictures.grocerapps.com/original/grocerapp-coca-cola-drink-5e6d18576d0a6.jpeg',
  },
  {
    categoryId: 2,
    id: 4,
    title: 'Sting',
    price: '30 Rs',
    description: 'A popular energy drink',
    imageUrl:
      'https://cdn.metro-online.pk/dashboard/prod-pic/LHE-01262/12620091-0-A.jpg?6',
  },
  {
    categoryId: 6,
    id: 5,
    title: 'Zera plus biscut',
    price: '20 Rs',
    description: 'A nice biscut',
    imageUrl:
      'https://static-01.daraz.pk/p/eab3d94715f16cb41e6ce379c37f7527.png_340x340q80.jpg_.webp',
  },
  {
    categoryId: 6,
    id: 6,
    title: 'Super biscut',
    price: '20 Rs',
    description: 'A nice biscut',
    imageUrl:
      'https://static-01.daraz.pk/p/eab3d94715f16cb41e6ce379c37f7527.png_340x340q80.jpg_.webp',
  },
  {
    categoryId: 8,
    id: 7,
    title: 'Books',
    price: '200 Rs',
    description: 'A nice Book',
    imageUrl: 'https://images.indianexpress.com/2020/04/books_1200.jpg',
  },
  {
    categoryId: 8,
    id: 8,
    title: 'Books',
    price: '400 Rs',
    description: 'A very nice Book',
    imageUrl: 'https://images.indianexpress.com/2020/04/books_1200.jpg',
  },
];

const ProductScreen = props => {
  const id = props.navigation.getParam('id');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state);
  // console.log(cartItems.cart);
  const selectedProducts = products.filter(product => {
    return product.categoryId === id;
  });
  const cartItem = item => {
    dispatch(addItemCart(item));
  };

  // console.log(cartItems.cart);
  // let cartQuantity;
  // cartItems.cart.forEach(element => {
  //   if (element.quantity > 0) {
  //     cartQuantity = element.quantity;
  //   }
  // });
  // item exists in cart or not

  return (
    <View style={styles.screen}>
      <FlatList
        data={selectedProducts}
        contentContainerStyle={styles.list}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Image
              style={{height: 100, width: 100, marginTop: 10}}
              source={{uri: itemData.item.imageUrl}}
            />
            <Text> {itemData.item.title}</Text>
            <Text> {itemData.item.description}</Text>
            <Text> {itemData.item.price}</Text>

            {cartItems.cart.some(product => {
              return product.id === itemData.item.id;
            }) ? (
              <View style={styles.quantityBar}>
                <Text
                  style={styles.icon}
                  onPress={() => dispatch(increaseQuantity(itemData.item.id))}>
                  +
                </Text>
                <Text style={styles.icon}>{itemData.item.quantity}</Text>
                <Text
                  style={styles.icon}
                  onPress={() => dispatch(decreaseQuantity(itemData.item.id))}>
                  -
                </Text>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPress={() => cartItem(itemData.item)}
              />
            )}
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        horizontal={false}
      />
      {/* Bottom Cart Bar */}
      <TouchableNativeFeedback
        onPress={() => props.navigation.navigate('CartScreen')}>
        <View style={styles.bottomCartBar}>
          <Text style={styles.bottomTabText}>
            View your Cart Rs.
            {cartItems.cart.reduce((acc, currentVal) => {
              return (
                parseInt(acc) +
                parseInt(currentVal.quantity) * parseInt(currentVal.price)
              );
            }, 0)}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
ProductScreen.navigationOptions = navData => {
  console.log(navData.navigation.getParam('categoryTitle'));
  return {
    headerTitle: navData.navigation.getParam('categoryTitle'),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  },
  bottomCartBar: {
    backgroundColor: '#CD113B',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabText: {
    color: 'white',
  },
  quantityBar: {
    flexDirection: 'row',
    backgroundColor: '#CD113B',
    width: 100,
    height: 30,
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  icon: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
export default ProductScreen;
