const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  publicId: { type: String, required: false },
  price: { type: String, required: true },
  oldPrice: { type: String, required: true },
  category: { type: String, required: true },
  ratings: {type: Number, required: false}
});

module.exports = mongoose.model("products", schema);
