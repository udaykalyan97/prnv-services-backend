// routes/serviceCategories.js
const express = require("express");
const router = express.Router();
const connection = require("../config/database");

// Get all categories
router.get("/", (req, res) => {
  connection.query("SELECT * FROM service_categories", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Create a new category
router.post("/", (req, res) => {
  const { name, description, icon_url, status } = req.body;
  const query = "INSERT INTO service_categories (name, description, icon_url, status) VALUES (?, ?, ?, ?)";
  connection.query(query, [name, description, icon_url, status], (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: "Service category created successfully.", category_id: result.insertId });
  });
});

module.exports = router;
