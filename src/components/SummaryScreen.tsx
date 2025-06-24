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
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl mx-auto text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">Quiz Completed</h2>
      <p className="text-lg mb-1">Score: {score} / {total}</p>
      <p className={`font-semibold mb-4 ${passed ? "text-green-600" : "text-red-600"}`}>
        {passed ? "You passed!" : "Try again to improve your score."}
      </p>
      <button
        onClick={onRetry}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Retry Quiz
      </button>
    </div>
  );
}
