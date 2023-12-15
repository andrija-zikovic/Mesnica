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
    total: Number,
    date: String,
    num: Number,
    status: Boolean,
});

module.exports = mongoose.model('Orders', ordersSchema);