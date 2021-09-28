import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

// Call the mongoose connection and database
connectDB()

const app = express()

app.use(express.json()) // allows to accept JSON data in the body.

app.get('/', (req, res) => {
  res.send('Api is running...')
})

// for any request for api/products, will be redirected to productRoutes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// when we're ready to make a payment, we'll hit this route from the frontend and we'll get this client Id.
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// to handle fallback errors 404. if you go anything that is not an actual route.
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
