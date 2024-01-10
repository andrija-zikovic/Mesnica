const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: String,
  price: Number,
  onStorage: Number,
  meatType: String,
  description: String,
  imgSrc: String,
});

module.exports = mongoose.model("Products", productsSchema);
