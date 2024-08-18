const Order = require("../models/Order");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verfityToken,
} = require("./verfiyToken");
const CryptoJS = require("crypto-js");

const {
  createOrder,
  updatedOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthSales,
  getMonthIncomeApproved,
  getMonthRevanue,
  getMostSales,
} = require("../controllers/order");

//CREATE

router.post(
  "/",
  verfityToken, 
  createOrder
);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updatedOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

// //GET ALL

router.get("/", getAllOrders); 

// GET MONTHLY PRODUCT SALES

router.get("/salesProduct", getMonthSales); 

// GET MONTHLY REVANUE (Based on Approved and Pending Transactions)

router.get("/revanue", getMonthRevanue);

// GET MONTHLY INCOME APPROVED (Based on  only Approved Transactions)

router.get("/incomeApproved", verifyTokenAndAdmin, getMonthIncomeApproved);

// GET MOST PRODUCT SALES

router.get("/salesMostProduct", getMostSales);

module.exports = router;
