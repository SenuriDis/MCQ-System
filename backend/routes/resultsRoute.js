const express = require("express");
const router = express.Router();
const { submitAnswers, getResultById } = require("../controllers/resultsController");

router.post("/submit", submitAnswers);
router.get("/:resultId", getResultById);

module.exports = router;
