const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const routs = {


  register: async (req, res) => {

    const { username, email, password } = req.body;

    try {
      User.find({ email }).then((users) => {
        if (users.length >= 1) {
          return res.status(409).json("This email already exists !");
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },



  login: async (req, res) => {
    try {
      const { email } = req.body;
      await User.find({ email }).then((users) => {
        if (users.length === 0) {
          return res.status(401).json("Authoriztion failed");
        }

        const [user] = users;

        const userId = user.id;
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (Originalpassword !== req.body.password) {
          return res.status(401).json("Wrong credentials!");
        }

        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, userId, accessToken });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = routs;
