const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Float32Array,
        require: true
    },
    onStorageAmount: {
        type: Number, 
        required: true
    },
    productId: {
        type: String, 
        required: true
    },
    productSpecNumber: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Products', employeeSchema);