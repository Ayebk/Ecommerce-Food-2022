const Slider = require("../models/Slider");
const Category = require("../models/Category");
const Store = require("../models/Store");

//CREATE

const routes = {
  // //GET ALL

  getAllSliders: async (req, res) => {
    try {
      const extraInfo = await Slider.find();
      res.status(200).json(extraInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  PostSliders: async (req, res) => {
    const newSlider = new Slider(req.body);

    try {
      const savedSlider = await newSlider.save();
      res.status(200).json(savedSlider);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  PostCategories: async (req, res) => {
    const newStore = new Store(req.body);

    try {
      const savedStore = await newStore.save();
      res.status(200).json(savedStore);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllStores: async (req, res) => {
    try {
      const stores = await Store.find();
      res.status(200).json(stores);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  PostStores: async (req, res) => {
    const newCategory = new Category(req.body);

    try {
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = routes;
