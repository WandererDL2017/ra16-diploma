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

const initalState = {
  categories: [{id: 1, title: 'Все'}],
  active: '',
  items: [],
  error: false,
  loadingCategories: false,
  loading: false,
  isMoreItems: true,
  moreLoading: false,
  search: ''
}

export const CatalogReducer = (store = initalState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST: {
      return {...store, loadingCategories: true, error: false}
    }
    case FETCH_CATEGORIES_SUCCESS: {
      const categories = action.payload.categories;
      return {...store,  active: 1, loadingCategories: false, categories: [...initalState.categories,...categories]}
    }
    case FETCH_CATEGORIES_FAILURE: {
      return {...store, loadingCategories: false, error: true}
    }
    case CHANGE_ACTIVE_CATEGORY: {
      const id = action.payload.id;
      return {...store, active: id}
    }
    case FETCH_ITEMS_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case FETCH_ITEMS_SUCCESS: {
      const items = action.payload.items;
      const isMoreitemsFLag = items.length === 6;
      return {...store, loading: false, items, isMoreItems: isMoreitemsFLag}
    }
    case FETCH_ITEMS_FAILURE: {
      return {...store, loading: false, error: true}
    }
    case FETCH_MORE_ITEMS_REQUEST: {
      return {...store, moreLoading: true, error: false}
    }
    case FETCH_MORE_ITEMS_SUCCESS: {
      const items = action.payload.items;
      const isMoreitemsFLag = items.length === 6;
      return {...store, moreLoading: false, items: [...store.items, ...items], isMoreItems: isMoreitemsFLag}
    }
    case FETCH_MORE_ITEMS_FAILURE: {
      return {...store, moreLoading: false}
    }
    case FETCH_SEARCH_ITEMS_REQUEST: {
      return {...store, loading: true, error: false}
    }
    case FETCH_SEARCH_ITEMS_SUCCESS: {
      const items = action.payload.items;
      const isMoreitemsFLag = items.length === 6;
      return {...store, loading: false, items: [...items], isMoreItems: isMoreitemsFLag}
    }
    case FETCH_SEARCH_ITEMS_FAILURE: {
      return {...store, loading: false, error: true}
    }
    case SET_SEARCH: {
      const {search} = action.payload;
      return {...store, search}
    }
    default: {
      return store;
    }
  }
}