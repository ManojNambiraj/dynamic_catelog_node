const Products = require("../models/productsModel");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");

const controller = {
  async addProducts(req, res) {
    try {
      const { name, price, oldPrice, category, ratings } = req.body;

      const data = await uploadToCloudinary(req.file.path, "catalog-images");

      const addedProducts = await Products.create({
        name,
        image: data.url,
        publicId: data.public_id,
        price,
        oldPrice,
        category,
        ratings,
      });

      res
        .status(200)
        .json({ status: true, message: "New product added", addedProducts });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async productsList(req, res) {
    try {
      const products = await Products.find();

      res.status(200).json({ status: true, message: products });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async product(req, res) {
    try {
      const { id } = req.params;

      const product = await Products.findOne({ _id: id });

      res.status(200).json({ status: true, message: product });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async CategoryBasedProduct(req, res) {
    try {
      const { category } = req.params;

      const products = await Products.find({ category: category });

      res.status(200).json({ status: true, message: products });
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, oldPrice, category, ratings } = req.body;

      const getProduct = await Products.findOne({ _id: id });

      if (getProduct) {
        let imageData = {};

        if (req.file) {
          await removeFromCloudinary(getProduct.publicId);

          imageData = await uploadToCloudinary(req.file.path, "catalog-images");
        } else {
          imageData.url = getProduct.image;
          imageData.publicId = getProduct.publicId;
        }

        const updateProductData = await Products.updateOne(
          { _id: id },
          {
            $set: {
              image: imageData.url,
              publicId: imageData.publicId,
              name,
              price,
              oldPrice,
              category,
              ratings,
            },
          }
        );

        res.status(200).json({
          status: true,
          message: "Updated successfully",
          updateProductData,
        });
      } else {
        res.status(404).json({ status: false, message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const getProduct = await Products.findOne({ _id: id });

      if (getProduct) {
        await removeFromCloudinary(getProduct.publicId);

        const deleteProductData = await Products.deleteOne({ _id: id });

        res.status(200).json({
          status: true,
          message: "Deleted successfully",
          deleteProductData,
        });
      } else {
        res.status(404).json({ status: false, message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  },
};

module.exports = controller;
