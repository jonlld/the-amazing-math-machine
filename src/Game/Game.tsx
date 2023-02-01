import { Fragment, useEffect, useState, useRef } from "react";
import GameStartWindow from "./GameStartWindow";
import SumWindow from "../Game/SumWindow";
import ScoreWindow from "../Game/ScoreWindow";
import { StartProps, Sum } from "../models/interfaces";
import { generateSum } from "../helpers";

function Game({ username, onLogOut, highscore }: StartProps): JSX.Element {
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
      setMessage("Game Over!");

      // TODO game over logic
    }
  }, [strikes]);

  // Trigger transition after mounting
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
        <button className="game-header__button" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        {!isPlaying && <GameStartWindow onStart={onStartHandler} />}
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
