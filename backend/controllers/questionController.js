const db = require("../db");

const getQuestionsByExamId = (req, res) => {
  const examId = req.params.examId;
  const sql = `
    SELECT id, question_text, option_a, option_b, option_c, option_d
    FROM questions
    WHERE exam_id = ?
  `;
  db.query(sql, [examId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { getQuestionsByExamId };
