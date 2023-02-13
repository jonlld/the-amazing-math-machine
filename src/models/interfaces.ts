// TODO Transfer save game data to a per-user basis
export interface UserData {
  username: string;
  highscore: number;
  savegame: boolean;
  savegameData: PausedGameData | {};
  scoreHistory: ScoreItem[];
}

// TODO Implement game modes
export interface ScoreItem {
  gameMode: string;
  timestamp: Date;
  score: number;
}

export interface PausedGameData {
  username: string;
  pausedType: string;
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
