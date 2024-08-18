const Product = require("../models/Product");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verfiyToken");
const CryptoJS = require("crypto-js");

const {
  createProduct,
  updatedProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  searchProduct,
} = require("../controllers/product");

//CREATE

router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updatedProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET Product
router.get("/find/:id", getProduct);

//SEARCH Products
router.get("/search/:text", searchProduct);

//GET ALL Products
router.get("/", getAllProducts);

module.exports = router;
