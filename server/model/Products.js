const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

console.log(productsSchema);

module.exports = mongoose.model('Products', productsSchema);