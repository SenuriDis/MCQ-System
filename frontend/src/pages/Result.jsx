import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function Result() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [width, height] = useWindowSize();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/results/${resultId}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }, [resultId]);

  const score = results.filter((r) => r.is_correct).length;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 relative overflow-hidden">
      {/* 🎉 Confetti if score > 4 */}
      {score > 4 && <Confetti width={width} height={height} />}

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Exam Result</h2>
        <div className="text-center text-xl font-medium text-blue-700 mb-8">
          You scored {score} / {results.length}
        </div>

        <ul className="space-y-6">
          {results.map((r, i) => (
            <li
              key={i}
              className={`p-5 rounded-xl border shadow ${
                r.is_correct ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <p className="font-semibold mb-1">
                {i + 1}. {r.question_text}
              </p>
              <p>
                <span className="font-medium">Your Answer:</span>{" "}
                <span
                  className={`${
                    r.is_correct ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {r.selected_option}
                </span>
              </p>
              {!r.is_correct && (
                <p>
                  <span className="font-medium">Correct Answer:</span>{" "}
                  {r.correct_option}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {r.is_correct ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </li>
          ))}
        </ul>

        {/* Buttons below */}
        <div className="mt-10 flex justify-center space-x-4">
          <button
            onClick={() => window.location.href = "http://localhost:5173/"}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            End Exam
          </button>
        </div>
      </div>
    </div>
  );
}
