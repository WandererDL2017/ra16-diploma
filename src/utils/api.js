import {
  fetchOrderRequest,
  fetchOrderSuccess,
  fetchOrderFailure
} from '../redux/Cart/actionCreators';

import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
  fetchMoreItemsRequest,
  fetchMoreItemsSuccess,
  fetchMoreItemsFailure,
  fetchSearchItemsRequest,
  fetchSearchItemsSuccess,
  fetchSearchItemsFailure,
} from '../redux/Catalog/actionCreators';

import {
  fetchItemRequest,
  fetchItemSuccess,
  fetchItemFailure,
} from '../redux/Product/actionCreators';

import {
  fetchTopSalesRequest,
  fetchTopSalesSuccess,
  fetchTopSalesFailure, 
} from '../redux/TopSales/actionCreators';

export const getTopSales = () => async(dispatch) => {
  try {
    dispatch(fetchTopSalesRequest());
    const respone = await fetch('http://localhost:7070/api/top-sales');
    const items = await respone.json();
    dispatch(fetchTopSalesSuccess(items))
  } catch (e) {
    dispatch(fetchTopSalesFailure(e))
  } 
}

export const getCategories = () => async(dispatch) => {
  try {
    dispatch(fetchCategoriesRequest());
    const respone = await fetch('http://localhost:7070/api/categories');
    const categories = await respone.json();
    dispatch(fetchCategoriesSuccess(categories))
  } catch (error) {
    dispatch(fetchCategoriesFailure(error))
  } 
}

export const getItems = (categore = 1, signal, search) => async(dispatch) => {
  try {
    dispatch(fetchItemsRequest());
    let fetchWay;
    if (categore !== 1) {
      fetchWay = `http://localhost:7070/api/items?categoryId=${categore}`;
    } else {
      fetchWay = `http://localhost:7070/api/items?`;
    }

    if (search) {
      fetchWay += `&q=${search}`;
    }
    const responce = await fetch(fetchWay, {signal})
    const items = await responce.json();
    dispatch(fetchItemsSuccess(items))
  } catch (error) {
    if (error.message === 'The user aborted a request.') {
    } else {
      dispatch(fetchItemsFailure(error))
    }
  } 
}

export const getMoreItems = (categore = 1, offset, search) => async(dispatch) => {
  try {
    dispatch(fetchMoreItemsRequest());

    let fetchWay;
    if (categore !== 1) {
      fetchWay = `http://localhost:7070/api/items?categoryId=${categore}&offset=${offset}`;
    } else {
      fetchWay = `http://localhost:7070/api/items?offset=${offset}`;
    }

    if (search) {
      fetchWay += `&q=${search}`;
    }
    const responce = await fetch(fetchWay);
    const items = await responce.json();
    dispatch(fetchMoreItemsSuccess(items))
  } catch (error) {
    dispatch(fetchMoreItemsFailure(error))
  } 
}

export const getSearchItems = (categore = 1, search) => async(dispatch) => {
  try {
    dispatch(fetchSearchItemsRequest());
    let responce;
    if (categore !== 1) {
      responce = await fetch(`http://localhost:7070/api/items?categoryId=${categore}&q=${search}`);
    } else {
      responce = await fetch(`http://localhost:7070/api/items?q=${search}`);
    } 
    const items = await responce.json();
    
    dispatch(fetchSearchItemsSuccess(items))
  } catch (error) {
       dispatch(fetchSearchItemsFailure(error))
  } 
}

export const getItem = (id) => async(dispatch) => {
  try {
    dispatch(fetchItemRequest());
    const responce = await fetch(`http://localhost:7070/api/items/${id}`);
    const item = await responce.json();
    dispatch(fetchItemSuccess(item))
  } catch (error) {
      dispatch(fetchItemFailure(error))
  }  
}

export const sendOrder = (order) => async(dispatch) => {
  try {
    dispatch(fetchOrderRequest());
      const responce = await fetch(`http://localhost:7070/api/order`, {
      method: "POST",
      body: JSON.stringify({
        ...order
      })
    });

    if (responce.status === 204) {
      dispatch(fetchOrderSuccess())
    } else {
      throw new Error('status not 204')
    }
  } catch (error) {
      dispatch(fetchOrderFailure(error))
  }  
}