const router = require("express").Router();
const productsController = require("../controllers/productsController");
const upload = require("../middleware/upload");

router.post(
  "/addProducts",
  upload.single("image"),
  productsController.addProducts
);
router.get("/products", productsController.productsList);
router.get("/product/:id", productsController.product);
router.get("/category/:category", productsController.CategoryBasedProduct)
router.put("/updateProduct/:id", productsController.updateProduct);
router.delete("/deleteProduct/:id", productsController.deleteProduct);

module.exports = router;
