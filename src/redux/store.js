import {combineReducers, applyMiddleware, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {TopSalesReducer} from './TopSales/reducer';
import {CatalogReducer} from './Catalog/reducer';
import {ProductReducer} from './Product/reducer';
import {CartReducer} from './Cart/reducer';


const reducers = combineReducers({
  topSales: TopSalesReducer,
  catalog: CatalogReducer,
  product: ProductReducer,
  cart: CartReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const store = configureStore({ reducer:reducers }, composeEnhancers(applyMiddleware(thunk)));
 
 export default store;