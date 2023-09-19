const Products = require('../model/Products');

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (products.length === 0) {
            return res.status(204).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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

module.exports = {
    getAllProducts,
    getSpecificProducts
}