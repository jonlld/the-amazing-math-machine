import { Fragment, useEffect, useState, useRef } from "react";
import SumWindow from "../Game/SumWindow";
import ScoreWindow from "../Game/ScoreWindow";

interface StartProps {
  username: string;
  onLogOut: () => void;
  highscore: number;
}

interface Sum {
  first: number;
  second: number;
}

function Game({ username, onLogOut, highscore }: StartProps): JSX.Element {
  // Refs
  const startContainerRef = useRef<HTMLElement>(null);

  // State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  // change to three strikes rule
  const [strikes, setStrikes] = useState<number>(0);
  const [message, setMessage] = useState<string>("Good luck!");

  // Handle Answer Fn
  const onAnswerHandler = (answer: number): void => {
    // Start game
    setIsPlaying(true);

    // Handle correct
    if (sum.first + sum.second === answer) {
      setMessage("Correct!");
      setIsCorrect(true);
      setScore((prev) => prev + 10);
    }

    // Handle incorrect
    else {
      if (strikes < 3) {
        setStrikes((p) => (p += 1));
      }

      setIsCorrect(false);
    }

    // Populate next sum
    generateSum();
  };

  // Generate Sum Helper
  const generateSum = (): void => {
    const first = Math.floor(Math.random() * 50 + 1);
    const second = Math.floor(Math.random() * 50 + 1);

    setSum((prev) => {
      return { ...prev, first, second };
    });
  };

  // Load initial sum
  useEffect(() => {
    generateSum();
  }, []);

  // Update message once state update is processed
  useEffect(() => {
    if (strikes !== 0) {
      setMessage(`${strikes}/3 Strikes!`);
    }
    if (strikes === 3) {
      setMessage("Game Over!");
      setIsPlaying(false);
    }
  }, [strikes]);

  // For CSS Transition
  useEffect(() => {
    setTimeout(() => {
      startContainerRef.current?.classList.remove("hidden");
    }, 0);
  }, []);

  return (
    <section ref={startContainerRef} className="start-container hidden">
      <header className="game-header">
        <h1 className="game-header__welcome">
          Welcome To The <span>Amazing Math Machine</span>, {username}!
        </h1>
        <button className="game-header__button" onClick={onLogOut}>
          Logout
        </button>
      </header>
      <main className="game-main">
        <SumWindow sum={sum} onAnswer={onAnswerHandler} />
        <ScoreWindow
          isPlaying={isPlaying}
          message={message}
          isCorrect={isCorrect}
          score={score}
          highscore={highscore}
        />
      </main>
    </section>
  );
}

export default Game;
