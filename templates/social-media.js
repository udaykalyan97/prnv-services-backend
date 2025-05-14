// server.js (Main Server File)
const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createPool({
  host: "localhost",
  user: "your_db_user",
  password: "your_db_password",
  database: "your_db_name"
});

// 1. Save Social Media Links (POST)
app.post("/api/social-links", async (req, res) => {
  const { links } = req.body;

  if (!Array.isArray(links) || links.length === 0) {
    return res.status(400).json({ message: "Invalid request. Please provide valid social media links." });
  }

  try {
    const query = "INSERT INTO social_media_links (platform, url) VALUES ?";
    const values = links.map(link => [link.platform, link.url]);
    await db.query(query, [values]);

    res.status(201).json({ message: "Social media links saved successfully." });
  } catch (error) {
    console.error("Error saving social media links:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 2. Fetch All Social Media Links (GET)
app.get("/api/social-links", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM social_media_links ORDER BY created_at DESC");
    res.status(200).json({ links: rows });
  } catch (error) {
    console.error("Error fetching social media links:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 3. Update Social Media Link (PUT)
app.put("/api/social-links/:id", async (req, res) => {
  const { id } = req.params;
  const { platform, url } = req.body;

  if (!platform || !url) {
    return res.status(400).json({ message: "Platform and URL are required." });
  }

  try {
    const [result] = await db.query(
      "UPDATE social_media_links SET platform = ?, url = ? WHERE id = ?",
      [platform, url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Social media link not found." });
    }

    res.status(200).json({ message: "Social media link updated successfully." });
  } catch (error) {
    console.error("Error updating social media link:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// 4. Delete Social Media Link (DELETE)
app.delete("/api/social-links/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM social_media_links WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Social media link not found." });
    }

    res.status(200).json({ message: "Social media link deleted successfully." });
  } catch (error) {
    console.error("Error deleting social media link:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
