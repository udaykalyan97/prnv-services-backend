// Login API Example
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("./database"); // Your MySQL connection

router.post("/login", async (req, res) => {
  const { email_or_phone, password, user_type } = req.body;
  let table = user_type === "professional" ? "professionals" 
            : user_type === "user" ? "users" 
            : "dba_registrations";

  const query = `SELECT * FROM ${table} WHERE (email = ? OR phone = ?) LIMIT 1`;
  const [results] = await db.query(query, [email_or_phone, email_or_phone]);

  if (results.length === 0) return res.status(404).json({ error: "User not found." });

  const user = results[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: "Invalid email/phone or password." });

  const token = jwt.sign(
    { id: user.id, email: user.email, user_type },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ message: "Login successful.", token, user });
});

module.exports = router;
