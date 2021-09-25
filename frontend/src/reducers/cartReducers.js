import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const cartReducer = (
  // state = { shippingAddress: {} },
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.product === item.product) //product is the assigned variable for 'id'

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : x) // if product has duplicate, replace the existing with new duplicate, if not just retain the existing one.
          ), // product is assigned name for id.
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], // previous cartItems and the new items from payload
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), // whatever is not in the action.payload will be shown
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload, // whatever is not in the action.payload will be shown. we just append our payload in the state
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload, // whatever is not in the action.payload will be shown. we just append our payload in the state
      }
    default:
      return state
  }
}
