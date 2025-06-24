import { useEffect, useState } from "react";
import quizJSON from "./data/questions.json";
import { shuffleArray } from "./utils/shuffle";
import QuestionCard from "./components/QuestionCard";
import SummaryScreen from "./components/SummaryScreen";
import type { Question, QuizData } from "./types";
import BackButton from "./assets/icons/BackButton";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

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
    <main className="main-container">
      {showSummary ? (
        <SummaryScreen
          score={score}
          total={questions.length}
          passmark={passmark}
          onRetry={handleRetry}
        />
      ) : (
        questions.length > 0 && (
          <div className="quiz-box fade-in">
            <div>
              <button
                disabled={currentIndex === 0}
                onClick={handleBack}
                className="back-button"
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
