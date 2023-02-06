import { useEffect, useState } from "react";
import ChooseGameWindow from "./GameChooseWindow";
import GameOverWindow from "./GameOverWindow";
import SumWindow from "./SumWindow";
import ScoreWindow from "./ScoreWindow";
import { Sum, PausedGameData } from "../../models/interfaces";
import { generateSum, checkAnswer } from "../../helpers";

interface GameProps {
  username: string;
  onLogOut: (data?: PausedGameData) => void;
  highscore: number;
  onGameOver: (score: number) => void;
  isRestart: boolean;
  pauseData: PausedGameData | null;
}

function Game({
  username,
  onLogOut,
  highscore,
  onGameOver,
  isRestart,
  pauseData,
}: GameProps): JSX.Element {
  // State
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [strikes, setStrikes] = useState<number>(0);
  const [message, setMessage] = useState<string>("Good luck!");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
    operand: "",
  });

  useEffect(() => {
    if (isRestart && pauseData !== null) {
      // Set state where located in Game
      setType(pauseData.pausedType);
      setSum(pauseData.pausedSum);
      setMessage(pauseData.pausedMessage);
      setScore(pauseData.pausedScore);
      setStrikes(pauseData.pausedStrikes);
      setIsCorrect(pauseData.pausedIsCorrect);
      // set game status - start game
      setIsPlaying(true);
    }
  }, [isRestart]);

  // HANDLE GAME START FROM CHOOSE GAME BUTTON CLICK
  const onStartHandler = (type: string): void => {
    // set sum type state for later use in generating sums
    setType(type);
    // Load initial sum
    setSum(generateSum(type));
    setMessage("Good luck!");
    setIsPlaying(true);
    setScore(0);
    setStrikes(0);
  };

  // FROM GAME OVER SCREEN
  // NEW GAME
  const playAgainHandler = (): void => {
    setMessage("Good luck!");
    setScore(0);
    setStrikes(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  // CHOOSE AGAIN
  const chooseHandler = (): void => {
    setIsPlaying(false);
    setIsGameOver(false);
  };

  const onLogoutHandler = (): void => {
    // call parent function
    onLogOut();
  };

  // TO SAVE DATA
  const onPauseHandler = (): void => {
    // format data
    let pausedGameData = {
      username,
      pausedType: type,
      pausedScore: score,
      pausedHighScore: highscore,
      pausedStrikes: strikes,
      pausedIsCorrect: isCorrect,
      pausedMessage: message,
      pausedSum: sum,
    };
    // pass in optional argument to handle in Game
    onLogOut(pausedGameData);
  };

  // HANDLE ANSWER
  const onAnswerHandler = (answer: number): void => {
    let isGood = checkAnswer(sum, answer);

    // IF CORRECT
    if (isGood) {
      setMessage(`
        Correct:
        ${3 - strikes} ${strikes === 2 ? "strike" : "strikes"} remaining!
        `);
      setIsCorrect(true);
      setScore((prev) => prev + 10);
    }

    // IF INCORRECT
    else {
      if (strikes < 3) setStrikes((p) => (p += 1));
      setIsCorrect(false);
    }

    // EVERY TIME
    // use type state in generating subsequent sums
    setSum(generateSum(type));
  };

  // CHECK STRIKES AND MANAGE GAME OVER
  useEffect(() => {
    if (strikes !== 0) {
      setMessage(`${strikes} of 3 Strikes!`);
    }
    if (strikes === 3) {
      // app-level state
      onGameOver(score);
      // state at this level
      setIsPlaying(false);
      setIsGameOver(true);
      setMessage("Game Over!");
    }
  }, [strikes]);

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
            className="btn  game-header--button"
            onClick={onLogoutHandler}
          >
            Logout
          </button>
          <button className="btn  game-header--button" onClick={onPauseHandler}>
            Pause
          </button>
        </div>
      </header>
      <main className="game-main">
        {/* NOT PLAYING STATES */}
        {!isPlaying && !isGameOver && (
          <ChooseGameWindow onStart={onStartHandler} />
        )}

        {!isPlaying && isGameOver && (
          <GameOverWindow
            score={score}
            highscore={highscore}
            onPlayAgain={playAgainHandler}
            onChoose={chooseHandler}
          />
        )}
        {/* PLAYING STATES */}
        {isPlaying && <SumWindow sum={sum} onAnswer={onAnswerHandler} />}

        {isPlaying && (
          <ScoreWindow
            // key to force re-render & trigger animation
            key={Math.random()}
            message={message}
            isCorrect={isCorrect}
            score={score}
            highscore={highscore}
          />
        )}
      </main>
    </section>
  );
}

export default Game;
