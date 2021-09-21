import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// we will have our entire cart to localStorage.
// getState allows us to get the entire state tree.
// so anything we want from the state even its in the other reducer/store like (productList...) we can grab that with getState.)
// We use getState to save the entire cart. This will give us a JSON object so we use Stringify because we can only save strings in localStorage
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty, //coming from the url
    },
  })

  //to save in localStorage.
  // We use getState to save the entire cart. This will give us a JSON object so we use Stringify because we can only save strings in localStorage.
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// we save it to local storage but where do we get it to fill a state? We do that in our store in initialState.
// initialState is where we can get our cart items, then we'll have our token and user in initial state later on.

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
