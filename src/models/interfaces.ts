// TODO move Props interfaces back to components, keep others

export interface UserData {
  username: string;
  highscore: number;
}

export interface PausedGameData {
  username: string;
  pausedScore: number;
  pausedStrikes: number;
  pausedMessage: string;
}

export interface Sum {
  first: number;
  second: number;
  operand: string;
}
