const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Products', productsSchema);
