import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
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

      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : x) // write the duplicated (existingItem) and the unique items fro the previous cart
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
        shippingAddress: action.payload, // whatever is not in the action.payload will be shown
      }
    default:
      return state
  }
}
