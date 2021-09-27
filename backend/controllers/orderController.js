import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @description Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    // instantiate a new Order with variable name 'order' before saving
    const order = new Order({
      orderItems,
      user: req.user._id, // we want to attach the login user. Bec this is going to be a protected route so we'll be able to get a token and get the user ID from the token.
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    // save the new order with variable name 'createdOrder'
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @description Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name, email'
  )
  //we want to get the name and email of the user

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// We want the order summary screen to show up.
// First, we need to get the order from the DB.
// The order id from the url (thru match.params.id), we will use it to make a request to the backend
// to fetch the order and display it in Order Screen

export { addOrderItems, getOrderById }
