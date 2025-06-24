import "./index.css";
import type { Question } from "../../types";

interface UserAnswer {
  selectedLabel: string;
  isCorrect: boolean;
}

interface Props {
  question: Question;
  onAnswer: (label: string, isCorrect: boolean) => void;
  selectedAnswer: UserAnswer | null;
}

export default function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
}: Props) {
  return (
    <div className="question-container">
      <h2 className="question-title">{question.question}</h2>

      <div className="options-grid">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer?.selectedLabel === option.label;

          return (
            <button
              key={index}
              onClick={() => onAnswer(option.label, option.isCorrect)}
              className={`option-button ${isSelected ? "option-selected" : ""}`}
            >
              <span className="flex-1">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
