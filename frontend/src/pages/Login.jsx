import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Senuri" }));
    navigate("/exams");
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Floating icons */}
      <div className="absolute text-4xl animate-floating opacity-20 left-10 top-10">✏️</div>
      <div className="absolute text-5xl animate-floating-slow opacity-20 right-16 top-20">📚</div>
      <div className="absolute text-3xl animate-floating opacity-20 left-20 bottom-20">📝</div>
      <div className="absolute text-4xl animate-floating-slow opacity-20 right-10 bottom-10">📖</div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-md z-10"
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to the MCQ Exam System
        </h1>
        <p className="mb-6 text-gray-600">Click below to start as a student</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Click to continue
        </button>
      </motion.div>
    </div>
  );
}
