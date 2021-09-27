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

export { addOrderItems }
