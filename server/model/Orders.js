const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    buyer: {
        name: String,
        address: String,
        email: String
    },
    products: [
        {
            description: String,
            price: Number,
            quantity: Number,
            unit: String
        }
    ],
    date: String,
    num: Number
});

module.exports = mongoose.model('Orders', ordersSchema);