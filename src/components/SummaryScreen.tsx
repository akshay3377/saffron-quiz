interface Props {
  score: number;
  total: number;
  onRetry: () => void;
  passmark: number;
}

export default function SummaryScreen({ score, total, onRetry, passmark }: Props) {
  const percentage = (score / total) * 100;
  const passed = percentage >= passmark;

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl text-center space-y-5 animate-fade-in">
      <h2 className="text-3xl font-bold text-indigo-700">Quiz Completed</h2>
      <p className="text-xl font-semibold">
        Score: {score} / {total}
      </p>
      <p className={`text-lg ${passed ? "text-green-600" : "text-red-500"}`}>
        {passed ? "🎉 You passed!" : "Try again to improve your score."}
      </p>
      <button
        onClick={onRetry}
        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-indigo-700 transition"
      >
         Retry Quiz
      </button>
    </div>
  );
}
