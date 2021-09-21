import mongoose from 'mongoose'
import bcrypt from 'bcryptjs' // to check if the plaintxt password is the same with the hash password from db.

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
