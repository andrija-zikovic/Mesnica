const Products = require('../model/Products');

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (!products) {
            return res.status(204).json({ 'message': 'No products found.' });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const getSpecificProducts = async (req, res) => {
    try {
        if (!req?.params?.title) {
            return res.status(400).json({ message: 'Product Title required' });
        }
        const products = await Products.find({ title: req.params.title }).exec();
        if (products.length === 0) {
            return res.status(204).json({ message: `No products match ${req.params.title}` });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createProduct = async (req, res) => {
    if (!req?.body?.title) {
        return res.status(400).json({ 'message': 'Title is required.' })
    }

    try {
        const result = await Products.create({
            title: req.body.title
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSpecificProducts
}