import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // individual rating
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // to associate the user with the review so we can check if a user already made a review
  },
  { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    // we need to reference spec model for this objectId. That adds relationship bet product and the user. referencing method

    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], // will be an array of review objects . this is embedding method.
    rating: { type: Number, required: true, default: 0 }, // average of all the review rating
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
