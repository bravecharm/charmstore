import mongoose from 'mongoose'
import dotenv from 'dotenv' //we need to import this to access our MONGO URI which is in our env file
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    // to delete everything inside these collections should there be any

    const createdUsers = await User.insertMany(users) // assign a const to get all the users inserted in the User collection

    const adminUser = createdUsers[0]._id // to extract the first user from  the createdUsers by id

    const sampleProducts = products.map((product) => {
      // to loop through each product from products.js and add the adminUser to each and create a new array named 'sampleProducts'
      return { ...product, user: adminUser }
    })

    console.log(sampleProducts)

    await Product.insertMany(sampleProducts) // to import all the newly create array 'sampleProducts' to the Product collection/model.
    console.log('Data Imported!'.green.inverse)
    process.exit() // to exit successfully
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) // to exit with a failure
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    // to delete everything inside these collections should there be any

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
