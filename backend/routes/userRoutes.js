import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)

router.post('/login', authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile) //to use middleware, we need to place it as the first argument

export default router
