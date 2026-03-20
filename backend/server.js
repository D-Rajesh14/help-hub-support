const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// This block now looks for Render's "Environment Variables"
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 20420,
    ssl: {
        rejectUnauthorized: false // REQUIRED for Aiven Cloud
    }
});

db.connect(err => {
    if (err) {
        console.log("❌ DB Error: " + err.message);
    } else {
        console.log("✅ MySQL Connected to Aiven Cloud!");
    }
});

// Added a Welcome Route so you don't get "Cannot GET /"
app.get("/", (req, res) => {
    res.send("HelpHub Backend is Live and Running! 🚀");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results && results.length > 0) res.json({ success: true, user: results[0].username });
        else res.status(401).json({ success: false });
    });
});

app.get('/tickets', (req, res) => {
    db.query("SELECT * FROM tickets ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/add', (req, res) => {
    const { name, problem } = req.body;
    db.query("INSERT INTO tickets (customer_name, problem_text, status) VALUES (?, ?, 'Open')", [name, problem], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Added");
    });
});

app.post('/resolve/:id', (req, res) => {
    const { staffName } = req.body;
    db.query("UPDATE tickets SET status = 'Resolved', resolved_by = ? WHERE id = ?", [staffName, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json("Resolved");
    });
});

// Render dynamic port assignment
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on Port ${PORT}`));