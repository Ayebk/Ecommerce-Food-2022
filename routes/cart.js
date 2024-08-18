const Cart = require("../models/Cart");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verfityToken,
} = require("./verfiyToken");
const CryptoJS = require("crypto-js");

const {
  createCart,
  updatedCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cart");

//CREATE

router.post("/", verfityToken, createCart); 

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updatedCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET User Cart
router.get("/find/:id", verifyTokenAndAuthorization, getUserCart);

// //GET ALL
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
