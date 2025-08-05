const express = require("express");
const router = express.Router();
const { getQuestionsByExamId } = require("../controllers/questionController");

router.get("/:examId", getQuestionsByExamId);

module.exports = router;
