const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, enum: ['Baguette', 'Sourdough', 'Focaccia'], required: true },
  availability: { type: Number, default: 0 },
  imageUrl: { type: String }, // Placeholder for product images
  discounts: { type: Number, default: 0 }, // Discount percentage
  wishlist: { type: Boolean, default: false },
  // ratings: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, rating: Number }], // Placeholder for user ratings
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;