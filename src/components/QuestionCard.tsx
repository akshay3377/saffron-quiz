import type { Question } from "../types";

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
    <div className="">
      <h2 className="text-xl mb-16  font-semibold leading-tight text-white">
        {question.question}
      </h2>

      <div className="grid gap-3 ">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer?.selectedLabel === option.label;
 

          return (
            <button
              key={index}
              onClick={() => onAnswer(option.label, option.isCorrect)}
              className={`flex items-center gap-3  border-2 border-blue-500 w-full text-left  px-5 py-3 rounded-xl shadow-xl shadow-[rgba(0,0,0,0.16)_0px_1px_4px] transition duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white  shadow-md"
                  : "bg-transparent   text-white"
              }`}
            >
              {/* <span
                className={`w-6 h-6 flex items-center ${
                  isSelected ? "text-white" : "text-blue-500 "
                } bg-blue-200/50 justify-center text-sm font-bold rounded-full`}
              >
                {optionLetter}
              </span> */}

              <span className="flex-1 font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
