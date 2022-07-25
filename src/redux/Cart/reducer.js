import {
  SET_CART_ITEMS,
  REMOVE_CART_IETMS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE
} from './actionType';

const initalState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  loading: false,
  successOrder: false,
  error: null
}

export const CartReducer = (store = initalState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS: {
      const items = action.payload.items;

      const oldCartItem = store.cartItems.find(i => {
        return (i.title === items.title && i.size === items.size)
      })

      let newCartItems;

      if (oldCartItem) {
        newCartItems = [...store.cartItems
          .filter(i => i.title !== items.title && i.size !== items.size),
          {...oldCartItem, count: oldCartItem.count + items.count}];
        localStorage.setItem('cart', JSON.stringify(newCartItems))
      } else {
        newCartItems = [...store.cartItems, items];
        localStorage.setItem('cart', JSON.stringify(newCartItems))

      }
      return ({...store, cartItems: newCartItems, successOrder: false})
    }
    case REMOVE_CART_IETMS: {
      const items = action.payload.items;
      const newCartItems = [...store.cartItems.filter(i => i.title !== items.title && i.size !== items.size)];
      localStorage.setItem('cart', JSON.stringify(newCartItems))
      return ({cartItems: newCartItems})
    }
    case FETCH_ORDER_REQUEST: {
      return {...store, loading: true, error: null}
    }
    case FETCH_ORDER_SUCCESS: {
      localStorage.clear();
      return {...initalState, cartItems: [], successOrder: true}
    }
    case FETCH_ORDER_FAILURE: {
      const error = action.payload.error;
      return {...store, loading: false, error: error}
    }
    default: {
      return store;
    }
  }
}