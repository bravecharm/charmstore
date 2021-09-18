import { createStore, combineReducers, applyMiddleware } from 'redux' // we applyMiddleware to use thunk
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' // to use redux dev tools
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
}) // we pass an empty object since we dont have any reducer yet

// the 'productList' will show as a part or piece of state

const initialState = {} // if we want something to be loaded when redux store loads initially we can put it here as initialState

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// we create a const named store to pass in createStore that takes in 3 arguments: reducer, initialState. composewithDevtools were we can place our middleware.

// the way to implement this store to our application is through a provider. That provider comes from react-redux.
// we will import store.js and provider in index.js as that is the entry point of React
