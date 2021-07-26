export const addItemCart = item => {
  return {
    // type: 'ADD_CART_ITEM',
    type: 'ADD_CART_ITEM',
    payload: item,
  };
};

export const increaseQuantity = id => {
  return {
    type: 'INCREASE_QUANTITY',
    payload: id,
  };
};

export const decreaseQuantity = id => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: id,
  };
};

export const deleteCartItem = id => {
  return {
    type: 'DELETE_CART_ITEM',
    payload: id,
  };
};
