import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  CHANGE_SIZE_ITEM,
  CHANGE_COUNT_ITEM
} from './actionType';

const initalState = {
  item: null,
  size: null,
  count: 0,
  error: null,
  loading: true
}

export const ProductReducer = (store = initalState, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST: {
      return {...initalState, loading: true, error: null}
    }
    case FETCH_ITEM_SUCCESS: {
      const item = action.payload.item;
      return {...store, loading: false, item}
    }
    case FETCH_ITEM_FAILURE: {
      const error = action.payload.error;
      return {...store, loading: false, error}
    }
    case CHANGE_SIZE_ITEM: {
      const size = action.payload.size;
      return {...store, size}
    }
    case CHANGE_COUNT_ITEM: {
      const count = action.payload.count;
      const newCount = (store.count + count) < 0 ? 0 : (store.count + count);
      return {...store, count: newCount}
    }
    default: {
      return store;
    }
  }
}