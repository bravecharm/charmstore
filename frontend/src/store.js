import { createStore, combineReducers, applyMiddleware } from 'redux' // we applyMiddleware to use thunk
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' // to use redux dev tools

const reducer = combineReducers({}) // we pass an empty object since we dont have any reducer yet

const initialState = {} // if we want something to be loaded when redux store loads initially we can put it here as initialState

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// the way to implement this store to our application is through a provider. That provider comes from react-redux
// we will import provider in index.js as that is the entry point of React
