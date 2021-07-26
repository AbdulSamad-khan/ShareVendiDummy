import {combineReducers} from 'redux';
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      // add item in cart
      action.payload.quantity = 1;

      return [...state, action.payload];
    case 'INCREASE_QUANTITY':
      // select a product to increament quntity
      const selectedProduct = state.find(product => {
        return product.item_id === action.payload;
      });
      // increament quantity
      selectedProduct.quantity = selectedProduct.quantity + 1;
      return state.map(product => {
        if (product.item_id === action.payload) {
          // update quantity if item exist in cart
          return selectedProduct;
        } else {
          return product;
        }
      });
    case 'DECREASE_QUANTITY':
      // select a product to decreament quntity
      const selectedProductforDec = state.find(product => {
        return product.item_id === action.payload;
      });
      // decreament quantity
      selectedProductforDec.quantity = selectedProductforDec.quantity - 1;

      // delete the item if the count is 0
      if (selectedProductforDec.quantity === 0) {
        return state.filter(product => {
          if (product.item_id === action.payload) {
            return false;
          } else {
            return true;
          }
        });
      } else {
        return state.map(product => {
          if (product.item_id === action.payload) {
            // update quantity if item exist in cart
            return selectedProductforDec;
          } else {
            return product;
          }
        });
      }
    case 'DELETE_CART_ITEM':
      return state.filter(product => {
        return product.item_id !== action.payload;
      });
    default:
      return state;
  }
};

export default combineReducers({
  cart: cartReducer,
});
