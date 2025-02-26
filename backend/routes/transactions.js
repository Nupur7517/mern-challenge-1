const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");

const router = express.Router();

// 📌 Function to extract month name from date
const getMonthFromDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", { month: "long" }).toLowerCase(); // Returns "january", "february", etc.
};

// 🔹 Initialize Database
router.get("/init", async (req, res) => {
  try {
    const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

    // 🔹 Convert dateOfSale into month and store it as a new field
    const updatedData = data.map((item) => ({
      ...item,
      month: getMonthFromDate(item.dateOfSale), // Adding month field dynamically
    }));

    await Transaction.deleteMany({});
    await Transaction.insertMany(updatedData);
    res.json({ message: "Database initialized with month field!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Transactions (with Search & Pagination)
router.get("/transactions", async (req, res) => {
  const { month, search = "", page = 1, per_page = 10 } = req.query;

  if (!month) return res.status(400).json({ error: "Month is required!" });

  const query = {
    month: month.toLowerCase(), // Using stored month field instead of calculating dynamically
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: !isNaN(search) ? Number(search) : null },
    ],
  };

  const transactions = await Transaction.find(query)
    .skip((page - 1) * per_page)
    .limit(Number(per_page));

  res.json(transactions);
});

// 🔹 Get Statistics
router.get("/statistics", async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ error: "Month is required!" });

  const totalSales = await Transaction.aggregate([
    { $match: { month: month.toLowerCase() } },
    { $group: { _id: null, totalAmount: { $sum: "$price" }, totalItems: { $sum: 1 } } },
  ]);

  const notSold = await Transaction.countDocuments({ month: month.toLowerCase(), sold: false });

  res.json({
    totalSales: totalSales[0]?.totalAmount || 0,
    totalItems: totalSales[0]?.totalItems || 0,
    notSold,
  });
});

// 🔹 Bar Chart Data
router.get("/barchart", async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ error: "Month is required!" });

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const result = [];
  for (let range of priceRanges) {
    const count = await Transaction.countDocuments({
      month: month.toLowerCase(),
      price: { $gte: range.min, $lt: range.max },
    });
    result.push({ range: range.range, count });
  }

  res.json(result);
});

// 🔹 Pie Chart Data
router.get("/piechart", async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ error: "Month is required!" });

  const categories = await Transaction.aggregate([
    { $match: { month: month.toLowerCase() } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  res.json(categories);
});

module.exports = router;
