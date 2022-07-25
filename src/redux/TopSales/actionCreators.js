import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
  FETCH_TOP_SALES_FAILURE
} from './actionType';

export function fetchTopSalesRequest() {
  return {type: FETCH_TOP_SALES_REQUEST}
}

export function fetchTopSalesSuccess(items) {
  return {type: FETCH_TOP_SALES_SUCCESS, payload: {items}}
}

export function fetchTopSalesFailure(error) {
  return {type: FETCH_TOP_SALES_FAILURE}
}