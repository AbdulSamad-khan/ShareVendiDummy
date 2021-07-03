import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CategoriesScreen from '../Screens/CategoriesScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';
import ProductScreen from '../Screens/ProductScreen';
import CartScreen from '../Screens/CartScreen';

const shopStack = createStackNavigator({
  CategoriesScreen: {
    screen: CategoriesScreen,
  },
  ProductScreen: {
    screen: ProductScreen,
  },
  ProductDetailScreen: {
    screen: ProductDetailScreen,
  },
  CartScreen: {
    screen: CartScreen,
  },
});

export default createAppContainer(shopStack);
