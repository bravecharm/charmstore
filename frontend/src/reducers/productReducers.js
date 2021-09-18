import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  // reducer accepts 2 things: state and action
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload } // returns the list of products
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  //we write the reviews because a product has multiple reviews so we place an empty array as initial state
  // reducer accepts 2 things: state and action
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: { reviews: [] } } // we just want to place whatever is in the state so we use spread operator. changed to this so the details request will be reset to avoid bugs in the product image.
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload } // returns the list of products
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
