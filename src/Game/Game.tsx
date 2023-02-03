import { Fragment, useEffect, useState, useRef } from "react";
import ChooseGameWindow from "./GameChooseWindow";
import GameOverWindow from "./GameOverWindow";
import SumWindow from "../Game/SumWindow";
import ScoreWindow from "../Game/ScoreWindow";
import { StartProps, Sum } from "../models/interfaces";
import { generateSum, checkAnswer } from "../helpers";

function Game({
  username,
  onLogOut,
  highscore,
  updateHighscore,
}: StartProps): JSX.Element {
  // Refs
  const startContainerRef = useRef<HTMLElement>(null);

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

  // HANDLE GAME START FROM CHOOSE GAME BUTTON CLICK
  const onStartHandler = (type: string): void => {
    // set type state for later use in generating sums
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

  // HANDLE ANSWER
  const onAnswerHandler = (answer: number): void => {
    let isGood = checkAnswer(sum, answer);

    // IF CORRECT
    if (isGood) {
      setMessage("Correct!");
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
      setMessage(`${strikes}/3 Strikes!`);
    }
    if (strikes === 3) {
      setMessage("Game Over!");
      setIsPlaying(false);
      // Update highscore on game over
      updateHighscore(score);
      setIsGameOver(true);
    }
  }, [strikes]);

  // Trigger fade-in on initial component load
  useEffect(() => {
    setTimeout(() => {
      startContainerRef.current?.classList.remove("hidden");
    }, 0);
  }, []);

  return (
    <section ref={startContainerRef} className="game-container hidden">
      <header className="game-header">
        <div>
          <h1 className="game-header--message">
            Welcome, <span>{username}!</span>
          </h1>
          <p>
            ...to the <span className="machine">Amazing Math Machine!</span>
          </p>
        </div>
        <button className="btn  game-header--button" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        {/* BEFORE START */}

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

        {/* AFTER START */}

        {isPlaying && <SumWindow sum={sum} onAnswer={onAnswerHandler} />}

        {isPlaying && (
          <ScoreWindow
            // Add changing key to force whole component to render & trigger animation each time
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
