import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler' // we import to handle any exceptions
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // try-catch so we can try to decode the token
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // this req.user will now have the access to all the protected routes
      req.user = await User.findById(decoded.id).select('-password') // we use select so we ensure that the password will not be sent

      console.log(decoded)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }
})

export { protect }
