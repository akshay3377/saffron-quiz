
import type { Question } from "../types";

interface Props {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({ question, onAnswer }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.isCorrect)}
            className="w-full text-left bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded-lg transition-all duration-200"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
