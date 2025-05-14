// routes/subscriptionPlans.js
const express = require("express");
const router = express.Router();
const connection = require("../config/database");

// Get all subscription plans
router.get("/", (req, res) => {
  connection.query("SELECT * FROM subscription_plans", (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Create a new subscription plan
router.post("/", (req, res) => {
  const { name, description, price, duration, status } = req.body;
  const query = "INSERT INTO subscription_plans (name, description, price, duration, status) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [name, description, price, duration, status], (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: "Subscription plan created successfully.", plan_id: result.insertId });
  });
});

// Update an existing subscription plan
router.put("/:id", (req, res) => {
  const { name, description, price, duration, status } = req.body;
  const { id } = req.params;
  const query = "UPDATE subscription_plans SET name = ?, description = ?, price = ?, duration = ?, status = ? WHERE id = ?";
  connection.query(query, [name, description, price, duration, status, id], (err) => {
    if (err) res.status(500).send(err);
    else res.json({ message: "Subscription plan updated successfully." });
  });
});

// Delete a subscription plan
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM subscription_plans WHERE id = ?";
  connection.query(query, [id], (err) => {
    if (err) res.status(500).send(err);
    else res.json({ message: "Subscription plan deleted successfully." });
  });
});

module.exports = router;
