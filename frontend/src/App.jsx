// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExamList from "./pages/ExamList";
import AttemptExam from "./pages/AttemptExam";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exam/:examId" element={<AttemptExam />} />
        <Route path="/result/:resultId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
