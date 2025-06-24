import './index.css';

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
    <div className="summary-container">
      <h2 className="summary-heading">Quiz Completed</h2>
      <p className="summary-score">Score: {score} / {total}</p>
      <p className={`summary-message ${passed ? 'pass' : 'fail'}`}>
        {passed ? "🎉 You passed!" : "Try again to improve your score."}
      </p>
      <button onClick={onRetry} className="retry-button">
        Retry Quiz
      </button>
    </div>
  );
}
