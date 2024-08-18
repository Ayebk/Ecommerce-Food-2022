const Order = require("../models/Order");

const routes = {
  //CREATE

  createOrder: async (req, res) => {
    const newOrder = new Order(req.body);

    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE
  updatedOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET User Cart
  getUserOrder: async (req, res) => {
    try {
      const orders = await Order.findOne({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // //GET ALL

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET MONTHLY INCOME SALES OF PRODUCT

  getMonthSales: async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            products: { $elemMatch: { productId } },
          },
        },
        {
          $unwind: {
            path: "$products",
          },
        },
        {
          $match: {
            "products.productId": productId,
          },
        },
        {
          $project: {
            Sales: "$products.quantity",
            month: { $month: "$createdAt" },
          },
        },

        {
          $group: {
            _id: "$month",
            total: { $sum: "$Sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET MONTHLY INCOME APPROVED

  getMonthIncomeApproved: async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: previousMonth } },
              { status: "Approved" },
            ],
          },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },

        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getMonthRevanue: async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET MOST  SALES OF PRODUCT

  getMostSales: async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        {
          $unwind: {
            path: "$products",
          },
        },

        {
          $project: {
            id: "$products.productId",
            Sales: "$products.quantity",
          },
        },

        {
          $group: {
            _id: "$id",
            total: { $sum: "$Sales" },
          },
        },
      ]);

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = routes;
