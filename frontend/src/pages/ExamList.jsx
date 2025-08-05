import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const gradientStyles = [
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500",
    "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500",
    "bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500",
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/exams").then((res) => {
      setExams(res.data);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-100 via-violet-100 to-pink-100 py-10 px-4 overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute text-5xl animate-floating opacity-10 top-10 left-10">📘</div>
      <div className="absolute text-4xl animate-floating-slow opacity-10 right-16 top-20">✏️</div>
      <div className="absolute text-5xl animate-floating opacity-10 bottom-16 left-16">🧠</div>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Exams</h2>
      <div className="max-w-3xl mx-auto grid gap-6">
        {exams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 rounded-xl shadow-md text-white ${
              gradientStyles[index % gradientStyles.length]
            } flex justify-between items-center`}
          >
            <div>
              <h3 className="text-xl font-semibold">{exam.title}</h3>
              <p className="text-sm opacity-90">{exam.description}</p>
            </div>
            <button
              onClick={() => navigate(`/exam/${exam.id}`)}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Start Exam
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
