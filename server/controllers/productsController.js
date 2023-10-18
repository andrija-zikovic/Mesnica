const Products = require('../model/Products');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // generate a unique filename
    }
});

const upload = multer({ storage: storage });

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (products < 1) {
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
            return res.status(400).json({ 'message': 'Product Title required' });
        }
        const products = await Products.find({ meatType: req.params.title });
        if (products.length === 0) {
            return res.status(204).json({ 'message': 'No products match' });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const createProduct = async (req, res) => {
    try {
        // Use Multer middleware to handle file uploads
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(500).json({ 'message': 'Multer error occurred.' });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({ 'message': 'Unknown error occurred.' });
            }

            console.log(req.file);
            // At this point, the file is successfully uploaded.
            const imagePath = req.file.path;
            const clientImageFileName = `600x400_${req.file.filename}`;
            const clientImagePath = path.join(__dirname, '..', '..', 'client', 'public', 'img', clientImageFileName);

            try {
                await sharp(imagePath)
                    .resize(600, 400)
                    .toFile(clientImagePath);
            } catch (error) {
                console.error('Error resizing image:', error);
                return res.status(500).json({ 'message': 'Error resizing image.' });
            }
            
            try {   
                await fs.unlinkSync(imagePath);
                console.log('File deleted successfully!');
            } catch (error) {
                console.error('Error deleting image:', error)
                return res.status(500).json({'message': 'Error deleting image.'})
            }

            // Handle other form data or business logic here
            
            try {
                const imgSrc = `img/600x400_${req.file.filename}`
                const product = await Products.create({
                    title: req.body.title,
                    price: req.body.price,
                    onStorage: req.body.onStorage,
                    meatType: req.body.meatType,
                    imgSrc: imgSrc
                });
                return res.status(201).json({'message': 'Product is added to products list!'});
            } catch (error) {
                console.error('Error adding a product:', error)
                return res.status(500).json({'message': 'Error adding product to database'})
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const changeProducts = async (req, res) => {
    if (!req?.body) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    console.log(req.body);

}

module.exports = {
    createProduct,
    getAllProducts,
    getSpecificProducts,
    changeProducts
}