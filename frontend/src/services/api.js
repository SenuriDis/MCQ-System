import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Adjust if your backend is on another port
});

export const getExams = async () => {
  const res = await API.get("/exams");
  return res.data;
};

export const getQuestions = async (examId) => {
  const res = await API.get(`/questions/${examId}`);
  return res.data;
};

export const submitAnswers = async (examId, answers) => {
  const res = await API.post("/results/submit", { examId, answers });
  return res.data;
};

export const getResult = async (resultId) => {
  const res = await API.get(`/results/${resultId}`);
  return res.data;
};
