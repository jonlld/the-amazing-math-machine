import { useState, useEffect, useContext } from "react";
import ChooseGameWindow from "./GameChooseWindow";
import GameOverWindow from "./GameOverWindow";
import SumWindow from "./SumWindow";
import ScoreWindow from "./ScoreWindow";
import {
  Sum,
  PausedGameData,
  UserData,
  SumType,
} from "../../models/interfaces";
import { generateSum, checkAnswer } from "../../helpers";
import ScoreContext from "../../context/score-context";

interface GameProps {
  username: string;
  isRestart: boolean;
  pauseData: PausedGameData | null;
  userStats: UserData | null;
  onLogOut: (data?: PausedGameData) => void;
  onGameOver: (score: number, sumType: SumType) => void;
}

const sumDefault: Sum = {
  first: 0,
  second: 0,
  operand: "",
};

function Game({
  username,
  isRestart,
  pauseData,
  userStats,
  onLogOut,
  onGameOver,
}: GameProps): JSX.Element {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [strikes, setStrikes] = useState<number>(0);
  const [message, setMessage] = useState<string>("Good luck!");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [sumType, setSumType] = useState<SumType>("");
  const [sum, setSum] = useState<Sum>(sumDefault);

  // context
  const ctx = useContext(ScoreContext);

  // INITIALISE RESTARTED GAME
  useEffect(() => {
    if (isRestart && pauseData !== null) {
      // Set Game state
      setSumType(pauseData.pausedType);
      setSum(pauseData.pausedSum);
      setMessage(pauseData.pausedMessage);
      setScore(pauseData.pausedScore);
      setStrikes(pauseData.pausedStrikes);
      setIsCorrect(pauseData.pausedIsCorrect);
      // set game status - start game
      setIsPlaying(true);
    }
  }, [isRestart]);

  // INITIALISE REGULAR GAME
  const onStartHandler = (sumType: SumType): void => {
    // set sumType state for later use in generating sums
    setSumType(sumType);
    // Load initial sum, taking sumType
    setSum(generateSum(sumType));
    setMessage("Good luck!");
    setIsPlaying(true);
    setScore(0);
    setStrikes(0);
  };

  // FROM GAME OVER SCREEN
  // RE-INITIALISE REGULAR GAME
  const playAgainHandler = (): void => {
    setMessage("Good luck!");
    setScore(0);
    setStrikes(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  // RETURN TO CHOOSE GAME
  const chooseHandler = (): void => {
    setIsPlaying(false);
    setIsGameOver(false);
  };

  const onLogoutHandler = (): void => {
    // props
    onLogOut();
  };

  // PAUSE GAME
  const onPauseHandler = (): void => {
    // format data
    let pausedGameData = {
      username,
      pausedType: sumType,
      pausedScore: score,
      pausedHighScore: ctx.highscore,
      pausedStrikes: strikes,
      pausedIsCorrect: isCorrect,
      pausedMessage: message,
      pausedSum: sum,
    };
    // handle in Game
    onLogOut(pausedGameData);
  };

  // CHECK ANSWER
  const onAnswerHandler = (answer: number): void => {
    let answerIsCorrect = checkAnswer(sum, answer);

    // IF CORRECT
    if (answerIsCorrect) {
      setMessage(`
          Correct:
          ${3 - strikes} ${strikes === 2 ? "strike" : "strikes"} remaining!
          `);
      setIsCorrect(true);
      setScore((prev) => prev + 10);
    }

    // IF INCORRECT
    if (!answerIsCorrect) {
      // update using local variable based on state, before finally updating state (as scheduled)
      let numStrikes = strikes;
      numStrikes += 1;

      if (numStrikes < 3) {
        setMessage(`${numStrikes} of 3 Strikes!`);
      }

      if (numStrikes === 3) {
        // state at this level
        setIsPlaying(false);
        setIsGameOver(true);
        setMessage("Game Over!");
        // app-level state
        onGameOver(score, sumType);
      }

      setStrikes(numStrikes);
      setIsCorrect(false);
    }

    // GENERATE NEXT SUM: REQUIRES TYPE STATE
    setSum(generateSum(sumType));
  };

  return (
    <section className="game-container fade-in-slide-up">
      <header className="game-header">
        <div>
          <h1 className="game-header--message">
            Welcome, <span>{username}!</span>
          </h1>
          <p>
            ...to the <span className="machine">Amazing Math Machine!</span>
          </p>
        </div>
        <div>
          <button
            className="btn  game-header--btn logout"
            onClick={onLogoutHandler}
          >
            Logout
          </button>
          {isPlaying && (
            <button className="btn  game-header--btn" onClick={onPauseHandler}>
              Logout & Save
            </button>
          )}
        </div>
      </header>
      <main className="game-main">
        {/* NON-PLAYING STATES */}
        {!isPlaying && !isGameOver && (
          <ChooseGameWindow onStart={onStartHandler} />
        )}

        {!isPlaying && isGameOver && (
          <GameOverWindow
            score={score}
            onPlayAgain={playAgainHandler}
            onChoose={chooseHandler}
            userStats={userStats}
          />
        )}
        {/* PLAYING STATES */}
        {isPlaying && <SumWindow sum={sum} onAnswer={onAnswerHandler} />}

        {isPlaying && (
          <ScoreWindow
            // key to force re-render for animation
            key={Math.random()}
            message={message}
            isCorrect={isCorrect}
            score={score}
          />
        )}
      </main>
    </section>
  );
}

export default Game;
