const Store = require("../models/Store");
const Category = require("../models/Category");
const Slider = require("../models/Slider");

const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verfityToken,
} = require("./verfiyToken");
const CryptoJS = require("crypto-js");

const {
  getAllSliders,
  PostSliders,
  getAllStores,
  PostStores,
  getAllCategories,
  PostCategories,
} = require("../controllers/info");

// //GET ALL
router.get("/slider/", getAllSliders);

router.post("/slider/",verifyTokenAndAdmin, PostSliders); 

router.get("/store/", getAllStores);

router.post("/store/",verifyTokenAndAdmin, PostStores); 

router.get("/category", getAllCategories);

router.post("/category",verifyTokenAndAdmin, PostCategories); 

module.exports = router;
