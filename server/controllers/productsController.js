const Products = require("../model/Products");
const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // generate a unique filename
  },
});

const upload = multer({ storage: storage });

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products < 1) {
      return res.status(204).json({ message: "No products found." });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSpecificProducts = async (req, res) => {
  try {
    if (!req?.params?.title) {
      return res.status(400).json({ message: "Product Title required" });
    }
    const searchRegex = new RegExp(req.params.title, "i");

    const products = await Products.find({ meatType: { $regex: searchRegex } });
    if (products.length === 0) {
      return res.status(204).json({ message: "No products match" });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  console.log("Creating product...");
  try {
    const { Storage } = require("@google-cloud/storage");

    const storage = new Storage({
      projectId: "mesnica02",
      keyFilename: "config/mesnica02-f5b8d956119e .json",
    });
    console.log("Storage created");
    const bucketName = "mesnica02.appspot.com";
    // Use Multer middleware to handle file uploads
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error(err);
        return res.status(500).json({ message: "Multer error occurred." });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error(err);
        return res.status(500).json({ message: "Unknown error occurred." });
      }

      const imagePath = req.file.path;

      try {
        const resizedImageBuffer = await sharp(imagePath)
          .resize(600, 400)
          .toBuffer();
        console.log("Image resized successfully!");
        // Set the ACL to make the object publicly readable
        const uploadOptions = {
          destination: `products/600x400_${req.file.filename}`,
          predefinedAcl: "publicRead",
          metadata: {
            contentType: req.file.mimetype,
          },
        };
        console.log("Upload options set successfully!");
        // Upload the resized image directly to Google Cloud Storage with public read ACL
        await storage
          .bucket(bucketName)
          .file(uploadOptions.destination)
          .save(resizedImageBuffer, {
            metadata: uploadOptions.metadata,
            predefinedAcl: uploadOptions.predefinedAcl,
          });
        console.log("Image uploaded to Google Cloud Storage successfully!");
        const imgSrc = `https://storage.googleapis.com/${bucketName}/${uploadOptions.destination}`;

        // Delete the local resized image file
        await fs.unlinkSync(imagePath);
        console.log("Local file deleted successfully!");

        // Handle other form data or business logic here
        const product = await Products.create({
          title: req.body.title,
          price: req.body.price,
          onStorage: req.body.onStorage,
          meatType: req.body.meatType,
          imgSrc: imgSrc,
        });
        console.log("Product created successfully!");
        return res
          .status(201)
          .json({ message: "Product is added to products list!" });
      } catch (error) {
        console.error("Error uploading image to Google Cloud Storage:", error);
        return res.status(500).json({ message: "Error uploading image." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeProducts = async (req, res) => {
  console.log("Updating product...");
  try {
    // Use Multer middleware to handle file uploads
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error(err);
        return res.status(500).json({ message: "Multer error occurred." });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error(err);
        return res.status(500).json({ message: "Unknown error occurred." });
      }
      const image = req.file;

      if (image) {
        const imagePath = req.file.path;
        const { Storage } = require("@google-cloud/storage");

        const storage = new Storage({
          projectId: "mesnica02",
          keyFilename: "config/mesnica02-f5b8d956119e .json",
        });
        console.log("Storage created");
        const bucketName = "mesnica02.appspot.com";

        try {
          const resizedImageBuffer = await sharp(imagePath)
            .resize(600, 400)
            .toBuffer();
          console.log("Image resized successfully!");
          // Set the ACL to make the object publicly readable
          const uploadOptions = {
            destination: `products/600x400_${req.file.filename}`,
            predefinedAcl: "publicRead",
            metadata: {
              contentType: req.file.mimetype,
            },
          };
          console.log("Upload options set successfully!");
          // Upload the resized image directly to Google Cloud Storage with public read ACL
          await storage
            .bucket(bucketName)
            .file(uploadOptions.destination)
            .save(resizedImageBuffer, {
              metadata: uploadOptions.metadata,
              predefinedAcl: uploadOptions.predefinedAcl,
            });
          console.log("Image uploaded to Google Cloud Storage successfully!");
          const imgSrc = `https://storage.googleapis.com/${bucketName}/${uploadOptions.destination}`;

          // Delete the local resized image file
          await fs.unlinkSync(imagePath);
          console.log("Local file deleted successfully!");

          // Handle other form data or business logic here
          const product = await Products.findByIdAndUpdate(
            req.body.id,
            {
              title: req.body.title,
              price: req.body.price,
              onStorage: req.body.onStorage,
              meatType: req.body.meatType,
              imgSrc: imgSrc,
            },
            { new: true }
          );

          console.log("Product created successfully!");
          return res
            .status(201)
            .json({ message: "Product is added to products list!" });
        } catch (error) {
          console.error(
            "Error uploading image to Google Cloud Storage:",
            error
          );
          return res.status(500).json({ message: "Error uploading image." });
        }
      } else {
        try {
          const product = await Products.findByIdAndUpdate(
            req.body.id,
            {
              title: req.body.title,
              price: req.body.price,
              onStorage: req.body.onStorage,
              meatType: req.body.meatType,
            },
            { new: true }
          );
          console.log("Product updated successfully!");
          return res.status(201).json({ message: "Product is updated!" });
        } catch (error) {
          console.error("Error updating:", error);
          return res.status(500).json({ message: "Error updating!" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.body.id;
  try {
    const deletedProduct = await Products.deleteOne({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSpecificProducts,
  changeProducts,
  deleteProduct,
};
