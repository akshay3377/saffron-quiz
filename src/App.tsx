import { useEffect, useState } from "react";
import quizJSON from "./data/questions.json";
import { shuffleArray } from "./utils/shuffle";
import QuestionCard from "./components/QuestionCard";
import SummaryScreen from "./components/SummaryScreen";
import type { Question, QuizData } from "./types";


export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [passmark, setPassmark] = useState(80);

  useEffect(() => {
    const data: QuizData = {
      ...quizJSON,
      questions: shuffleArray(
        quizJSON.questions.map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }))
      )
    };

    setQuestions(data.questions);
    setPassmark(data.passmark);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowSummary(false);

    const data: QuizData = {
      ...quizJSON,
      questions: shuffleArray(
        quizJSON.questions.map(q => ({
          ...q,
          options: shuffleArray(q.options)
        }))
      )
    };

    setQuestions(data.questions);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-12">
      {showSummary ? (
        <SummaryScreen
          score={score}
          total={questions.length}
          passmark={passmark}
          onRetry={handleRetry}
        />
      ) : (
        questions.length > 0 && (
          <QuestionCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
          />
        )
      )}
    </main>
  );
}
