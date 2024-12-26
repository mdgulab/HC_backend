
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000; // Use your desired port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "153.92.15.44", // e.g., "sql123.hostinger.com"
  user: "u478273243_gulab",
  password: "Mdgulab@123",
  database: "u478273243_GulabDB",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// API Endpoint to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, dob, mobile, message, state, city } = req.body;

  if (!name || !email || !dob || !mobile || !message || !state || !city) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO contact_form (name, email, dob, mobile, message, state, city) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, email, dob, mobile, message, state, city];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).json({ error: "Failed to submit form" });
    } else {
      console.log(result)
      res.status(200).json({ message: "Form submitted successfully!" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
