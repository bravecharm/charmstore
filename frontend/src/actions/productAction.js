import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

// thunk made this possible. it allows asynchronous request in action creators.
//we pass in dispatch to dispatch the actions
export const listProducts = () => async (dispatch) => {
  // and to add a function within a function.
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products') // we use axios so the frontend can make http requests from the backend
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// we wanted to get the errors from the backend into our front end state so we use error.response. and if there is a custom message, then we get it first instead of the generic response.

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
