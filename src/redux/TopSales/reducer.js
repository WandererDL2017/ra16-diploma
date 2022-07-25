import {
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
  FETCH_TOP_SALES_FAILURE
} from './actionType';

const initalState = {
  items: [],
  error: false,
  loading: false
}

export const TopSalesReducer = (store = initalState, action) => {
  switch (action.type) {
    case FETCH_TOP_SALES_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case FETCH_TOP_SALES_SUCCESS: {
      const items = action.payload.items;
      return {...store, loading: false, items}
    }
    case FETCH_TOP_SALES_FAILURE: {
      return {...store, loading: false, error: true}
    }
    default: {
      return store;
    }
  }
}