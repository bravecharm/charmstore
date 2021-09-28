import { createStore, combineReducers, applyMiddleware } from 'redux' // we applyMiddleware to use thunk
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' // to use redux dev tools
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
})
// the 'productList' will show as a part or piece of state
// we want to fetch the saved items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
} // if we want something to be loaded when redux store loads initially we can put it here as initialState
// when our store initializes, if there is something in the localStorage for shippingAddress we  want to add that to the state.
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
