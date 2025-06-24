import "./index.css";

interface Props {
  currentIndex: number;
  questions: any[];
}

export default function ProgressBar({ currentIndex, questions }: Props) {
  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="progress-label">
        <span className="progress-label-text">
          Question <strong>{currentIndex + 1}</strong>
          <small> / {questions.length}</small>
        </span>
      </div>
    </div>
  );
}
