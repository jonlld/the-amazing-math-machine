// TODO Transfer save game data to a per-user basis
export interface UserData {
  username: string;
  highscore: number;
  savegame: boolean;
  savegameData: PausedGameData | {};
  scoreHistory: ScoreItem[];
}

// 'random' is legacy - see rollforward in helpers.js
export type SumType = "" | "add" | "subtract" | "multiply" | "mix" | "random";

// TODO Implement game modes
export interface ScoreItem {
  difficulty: number;
  gameMode: string;
  sumType: SumType;
  date: string;
  score: number;
}

export interface PausedGameData {
  username: string;
  pausedType: SumType;
  pausedScore: number;
  pausedHighScore: number;
  pausedStrikes: number;
  pausedIsCorrect: boolean;
  pausedMessage: string;
  pausedSum: Sum;
}

export interface Sum {
  first: number;
  second: number;
  operand: string;
}
