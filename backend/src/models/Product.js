const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }, // URL for external images
  imageData: { type: String }, // Base64 encoded image data
  imageName: { type: String }, // Original filename
  imageType: { type: String }  // MIME type (image/jpeg, image/png, etc.)
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
