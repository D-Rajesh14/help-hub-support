const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rajesh123', 
    database: 'support_db'
});

db.connect(err => {
    if (err) console.log("❌ DB Error: " + err.message);
    else console.log("✅ MySQL Connected!");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (results && results.length > 0) res.json({ success: true, user: results[0].username });
        else res.status(401).json({ success: false });
    });
});

app.get('/tickets', (req, res) => {
    db.query("SELECT * FROM tickets ORDER BY id DESC", (err, results) => res.json(results));
});

app.post('/add', (req, res) => {
    const { name, problem } = req.body;
    db.query("INSERT INTO tickets (customer_name, problem_text) VALUES (?, ?)", [name, problem], () => res.json("Added"));
});

app.post('/resolve/:id', (req, res) => {
    const { staffName } = req.body;
    db.query("UPDATE tickets SET status = 'Resolved', resolved_by = ? WHERE id = ?", [staffName, req.params.id], () => res.json("Resolved"));
});

app.listen(5000, () => console.log("🚀 Server running on Port 5000"));