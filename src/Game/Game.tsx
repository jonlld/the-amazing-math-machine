import { Fragment, useEffect, useState, useRef } from "react";
import GameStartWindow from "./GameStartWindow";
import GameOverWindow from "./GameOverWindow";
import SumWindow from "../Game/SumWindow";
import ScoreWindow from "../Game/ScoreWindow";
import { StartProps, Sum } from "../models/interfaces";
import { generateSum } from "../helpers";

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
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // HANDLE GAME START
  const onStartHandler = (): void => {
    setIsPlaying(true);
    // reset state here?
    setScore(0);
    setStrikes(0);
  };

  // HANDLE GAME OVER
  const playAgainHandler = (): void => {
    setMessage("Good luck!");
    setScore(0);
    setStrikes(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  // HANDLE ANSWER
  const onAnswerHandler = (answer: number): void => {
    // IF CORRECT
    if (sum.first + sum.second === answer) {
      setMessage("Correct!");
      setIsCorrect(true);
      setScore((prev) => prev + 10);
    }

    // IF INCORRECT
    else {
      if (strikes < 3) {
        setStrikes((p) => (p += 1));
      }
      setIsCorrect(false);
    }

    // ALWAYS
    setSum(generateSum());
  };

  // Load initial sum
  useEffect(() => {
    setSum(generateSum());
  }, []);

  // Update message once state update is processed
  useEffect(() => {
    if (strikes !== 0) {
      setMessage(`${strikes}/3 Strikes!`);
    }
    if (strikes === 3) {
      // TODO game over logic
      setMessage("Game Over!");
      // end game
      setIsPlaying(false);
      // update highscore
      updateHighscore(score);
      // show game over screen
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
    <section ref={startContainerRef} className="start-container hidden">
      <header className="game-header">
        <h1 className="game-header__welcome">
          Welcome To The <span>Amazing Math Machine</span>,{" "}
          <span className="username">{username}</span>!
        </h1>
        <button className="btn" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        {/* BEFORE START */}
        {!isPlaying && !isGameOver && (
          <GameStartWindow onStart={onStartHandler} />
        )}
        {!isPlaying && isGameOver && (
          <GameOverWindow
            score={score}
            highscore={highscore}
            onPlayAgain={playAgainHandler}
          />
        )}
        {/* AFTER START */}
        {isPlaying && <SumWindow sum={sum} onAnswer={onAnswerHandler} />}
        {isPlaying && (
          <ScoreWindow
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
