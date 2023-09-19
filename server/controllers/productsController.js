const Products = require('../model/Products')

const getAllProducts = async (req, res) => {
    const products = await Products.find();
    if (!products) return res.status(204).json({ 'message': 'No employees found' });
    res.json(employees);
}

const getSpecificProducts = async (req, res) => {
    if (!req?.params?.specNum) return res.status(400).json({ 'messgae': 'Products Specific Number required' });
    const products = await Products.find({ productSpecNumber: req.parms.specNum }).exec();
    if (!products) {
        return res.status(204).json({ 'message': `No products matches ${req.params.specNum}` });
    }
    res.json(products);
}

module.exports = {
    getAllProducts,
    getSpecificProducts
}