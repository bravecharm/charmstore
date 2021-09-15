import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // we can always pass timestamps as the 2nd argument of the mongoose.Schema
  }
)

const User = mongoose.model('User', userSchema)

export default User
