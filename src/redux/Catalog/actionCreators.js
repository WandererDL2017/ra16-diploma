import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CHANGE_ACTIVE_CATEGORY,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_MORE_ITEMS_REQUEST,
  FETCH_MORE_ITEMS_SUCCESS,
  FETCH_MORE_ITEMS_FAILURE,
  FETCH_SEARCH_ITEMS_REQUEST,
  FETCH_SEARCH_ITEMS_SUCCESS,
  FETCH_SEARCH_ITEMS_FAILURE,
  SET_SEARCH
} from './actionType';


export function fetchCategoriesRequest() {
  return {type: FETCH_CATEGORIES_REQUEST}
}

export function fetchCategoriesSuccess(categories) {
  return {type: FETCH_CATEGORIES_SUCCESS, payload: {categories}}
}

export function fetchCategoriesFailure(error) {
  return {type: FETCH_CATEGORIES_FAILURE}
}

export function changeActiveCategory(id) {
  return {type: CHANGE_ACTIVE_CATEGORY, payload: {id}}
}

export function fetchItemsRequest() {
  return {type: FETCH_ITEMS_REQUEST}
}

export function fetchItemsSuccess(items) {
  return {type: FETCH_ITEMS_SUCCESS, payload: {items}}
}

export function fetchItemsFailure(error) {
  return {type: FETCH_ITEMS_FAILURE, payload: {error}}
}

export function fetchMoreItemsRequest() {
  return {type: FETCH_MORE_ITEMS_REQUEST}
}

export function fetchMoreItemsSuccess(items) {
  return {type: FETCH_MORE_ITEMS_SUCCESS, payload: {items}}
}

export function fetchMoreItemsFailure(error) {
  return {type: FETCH_MORE_ITEMS_FAILURE, payload: {error}}
}

export function fetchSearchItemsRequest() {
  return {type: FETCH_SEARCH_ITEMS_REQUEST}
}

export function fetchSearchItemsSuccess(items) {
  return {type: FETCH_SEARCH_ITEMS_SUCCESS, payload: {items}}
}

export function fetchSearchItemsFailure(error) {
  return {type: FETCH_SEARCH_ITEMS_FAILURE, payload: {error}}
}

export function setSearch(search) {
  return {type: SET_SEARCH, payload: {search}}
}