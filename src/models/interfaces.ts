// TODO move Props interfaces back to components, keep others

export interface UserData {
  username: string;
  highscore: number;
}

export interface PausedGameData {
  username: string;
  pausedType: string;
  pausedScore: number;
  pausedHighScore: number;
  pausedStrikes: number;
  pausedIsCorrect: boolean;
  pausedMessage: string;
}

export interface Sum {
  first: number;
  second: number;
  operand: string;
}
