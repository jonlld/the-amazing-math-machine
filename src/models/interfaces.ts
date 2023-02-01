export interface UserData {
  username: string;
  highscore: number;
}

export interface StartProps {
  username: string;
  onLogOut: () => void;
  highscore: number;
  updateHighscore: (score: number) => void;
}

export interface Sum {
  first: number;
  second: number;
}

export interface GameStartProps {
  onStart: () => void;
}

export interface GameOverProps {
  score: number;
  highscore: number;
  onPlayAgain: () => void;
}

export interface ScoreProps {
  isCorrect: boolean;
  message: string;
  score: number;
  highscore: number;
}

export interface QuizProps {
  sum: { first: number; second: number };
  onAnswer: (guess: number) => void;
}
