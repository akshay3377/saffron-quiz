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
      <h2 className="text-xl mb-8 mt-[90px]  md:mt-[0px]  font-semibold leading-tight text-gray-800">
        {question.question}
      </h2>

      <div className="grid gap-3 ">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer?.selectedLabel === option.label;
          const optionLetter = String.fromCharCode(65 + index);

          return (
            <button
              key={index}
              onClick={() => onAnswer(option.label, option.isCorrect)}
              className={`flex items-center gap-3 w-full text-left  px-5 py-3 rounded-lg shadow-xl shadow-[rgba(0,0,0,0.16)_0px_1px_4px] transition duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white  shadow-md"
                  : "bg-white hover:bg-indigo-50   text-gray-800"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center ${
                  isSelected ? "text-white" : "text-blue-500 "
                } bg-blue-200/50 justify-center text-sm font-bold rounded-full`}
              >
                {optionLetter}
              </span>

              <span className="flex-1 font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
