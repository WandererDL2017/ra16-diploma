import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  CHANGE_SIZE_ITEM,
  CHANGE_COUNT_ITEM
} from './actionType';

export function fetchItemRequest() {
  return {type: FETCH_ITEM_REQUEST}
}

export function fetchItemSuccess(item) {
  return {type: FETCH_ITEM_SUCCESS, payload: {item}}
}

export function fetchItemFailure(error) {
  return {type: FETCH_ITEM_FAILURE, payload: {error}}
}

export function changeSizeItem(size) {
  return {type: CHANGE_SIZE_ITEM, payload: {size}}
}

export function changeCountItem(count) {
  return {type: CHANGE_COUNT_ITEM, payload: {count}}
}