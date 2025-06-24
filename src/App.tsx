import { useEffect, useState } from "react";
import quizJSON from "./data/questions.json";
import { shuffleArray } from "./utils/shuffle";
import QuestionCard from "./components/QuestionCard";
import SummaryScreen from "./components/SummaryScreen";
import type { Question, QuizData } from "./types";
import BackButton from "./assets/icons/BackButton";
import ProgressBar from "./components/ProgressBar";

interface UserAnswer {
  selectedLabel: string;
  isCorrect: boolean;
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(UserAnswer | null)[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [passmark, setPassmark] = useState(80);

  const initializeQuiz = () => {
    const data: QuizData = {
      ...quizJSON,
      questions: shuffleArray(
        quizJSON.questions.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }))
      ),
    };

    setQuestions(data.questions);
    setPassmark(data.passmark);
    setUserAnswers(Array(data.questions.length).fill(null));
    setCurrentIndex(0);
    setShowSummary(false);
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

  const handleAnswer = (label: string, isCorrect: boolean) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = { selectedLabel: label, isCorrect };
    setUserAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetry = () => {
    initializeQuiz();
  };

  const score = userAnswers.filter((ans) => ans?.isCorrect).length;

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-10 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[url('/quiz-bg.jpg')] bg-cover bg-center opacity-95 z-0" />

      {showSummary ? (
        <SummaryScreen
          score={score}
          total={questions.length}
          passmark={passmark}
          onRetry={handleRetry}
        />
      ) : (
        questions.length > 0 && (
          <div className="w-full max-w-2xl p-4 sm:p-6 absolute inset-0 md:static md:inset-auto bg-gradient-to-t from-blue-200 to-gray-100 shadow-lg rounded-lg space-y-6 transition-all duration-300 animate-fade-in">
            <div className="mb-8 text-gray-500">
              <button
                disabled={currentIndex === 0}
                onClick={handleBack}
                className={`px-2 py-2 text-sm mb-4 w-fit rounded-lg transition ${
                  currentIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                }`}
              >
                <BackButton className="text-white" />
              </button>

              <ProgressBar currentIndex={currentIndex} questions={questions} />
            </div>

            <QuestionCard
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              selectedAnswer={userAnswers[currentIndex]}
            />
          </div>
        )
      )}
    </main>
  );
}
