import express from 'express'
const router = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile) //to use middleware, we need to place it as the first argument

export default router
