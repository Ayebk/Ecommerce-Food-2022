const User = require("../models/User");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verfiyToken");
const CryptoJS = require("crypto-js");

const {
  userUpdate,
  userDelete,
  userGet,
  userGetAll,
  userStates,
} = require("../controllers/user");

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, userUpdate);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, userDelete);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, userGet);

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, userGetAll); //verifyTokenAndAdmin

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, userStates); //verifyTokenAndAdmin

module.exports = router;
