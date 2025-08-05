const db = require("../db");

const getAllExams = (req, res) => {
  const sql = "SELECT * FROM exams";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { getAllExams };
