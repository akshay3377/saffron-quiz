export interface Option {
  label: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface QuizData {
  passmark: number;
  questions: Question[];
}
