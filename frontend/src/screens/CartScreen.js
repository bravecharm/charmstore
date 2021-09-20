import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' // you import this when you're dealing with a redux state within a component
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  // location.search - to get a query string.
  //we use split, so we can split them between the equal sign ie ?qty=2, the qty is the 0 index and '2' is 1 index

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}

export default CartScreen
