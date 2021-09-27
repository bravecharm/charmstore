// We'll hit this route from the action and then the order will be created and saved, then will be sent down through the state
// After the orders are created to the database, they will be sent to a specific order page on the frontend.
// It will be displayed as order/:id. And thats the page where we want to have our Paypal Button.

import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// this will make a post request to /api/orders
router.route('/').post(protect, addOrderItems)

export default router
