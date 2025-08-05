import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function AttemptExam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/questions/${examId}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [examId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      user_id: user.id,
      exam_id: parseInt(examId),
      answers: questions.map((q) => ({
        question_id: q.id,
        selected_option: answers[q.id] || "",
      })),
    };

    axios
      .post("http://localhost:5000/api/results/submit", payload)
      .then((res) => {
        const { result_id } = res.data;
        navigate(`/result/${result_id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4 overflow-hidden">
      {/* Floating icons */}
      <div className="absolute text-5xl opacity-10 animate-floating top-10 left-10">📝</div>
      <div className="absolute text-4xl opacity-10 animate-floating-slow right-16 top-20">📖</div>
      <div className="absolute text-4xl opacity-10 animate-floating bottom-12 left-16">🧠</div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">MCQ Exam</h2>

        <form className="space-y-8">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border"
            >
              <h4 className="font-semibold text-lg mb-3 text-gray-800">
                {index + 1}. {q.question_text}
              </h4>

              {["A", "B", "C", "D"].map((option) => {
                const isSelected = answers[q.id] === option;
                return (
                  <label
                    key={option}
                    className={`block mb-2 cursor-pointer rounded p-2 border transition
                      ${
                        isSelected
                          ? "bg-green-100 border-green-400"
                          : "hover:bg-gray-100 border-transparent"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      className="mr-2"
                      checked={isSelected}
                      onChange={() => handleOptionChange(q.id, option)}
                    />
                    {q[`option_${option.toLowerCase()}`]}
                  </label>
                );
              })}
            </motion.div>
          ))}

          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Submit Answers
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
