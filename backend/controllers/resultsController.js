const db = require("../db");

const submitAnswers = (req, res) => {
  const { user_id, exam_id, answers } = req.body;

  const questionIds = answers.map(a => a.question_id);
  const sqlCorrects = "SELECT id, correct_option FROM questions WHERE id IN (?)";

  db.query(sqlCorrects, [questionIds], (err, correctRows) => {
    if (err) return res.status(500).json({ error: err.message });

    let score = 0;
    const correctMap = {};
    correctRows.forEach(q => correctMap[q.id] = q.correct_option);

    const evaluated = answers.map(a => {
      const isCorrect = a.selected_option === correctMap[a.question_id];
      if (isCorrect) score++;
      return { ...a, is_correct: isCorrect };
    });

    const sqlInsertResult = "INSERT INTO results (user_id, exam_id, score) VALUES (?, ?, ?)";
    db.query(sqlInsertResult, [user_id, exam_id, score], (err, resultRes) => {
      if (err) return res.status(500).json({ error: err.message });

      const result_id = resultRes.insertId;
      const values = evaluated.map(a => [result_id, a.question_id, a.selected_option, a.is_correct]);
      const sqlInsertAnswers = `
        INSERT INTO answers (result_id, question_id, selected_option, is_correct)
        VALUES ?
      `;

      db.query(sqlInsertAnswers, [values], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ result_id, score });
      });
    });
  });
};

const getResultById = (req, res) => {
  const resultId = req.params.resultId;
  const sql = `
    SELECT q.question_text, q.correct_option, a.selected_option, a.is_correct
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    WHERE a.result_id = ?
  `;
  db.query(sql, [resultId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { submitAnswers, getResultById };
