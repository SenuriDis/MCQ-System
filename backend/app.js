const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const examRoutes = require("./routes/examRoute");
const questionRoutes = require("./routes/questionRoute");
const resultRoutes = require("./routes/resultsRoute");

app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
