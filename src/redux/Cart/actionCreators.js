import {
  SET_CART_ITEMS,
  REMOVE_CART_IETMS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE
} from './actionType';

export function setCartItems(items) {
  return {type: SET_CART_ITEMS, payload: {items}}
}

export function removeCartItems(items) {
  return {type: REMOVE_CART_IETMS, payload: {items}}
}

export function fetchOrderRequest() {
  return {type: FETCH_ORDER_REQUEST}
}

export function fetchOrderSuccess(code) {
  return {type: FETCH_ORDER_SUCCESS, payload: {code}}
}

export function fetchOrderFailure(error) {
  return {type: FETCH_ORDER_FAILURE, payload: {error}}
}