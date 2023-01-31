import { Fragment, useEffect, useState, useRef } from "react";
import QuizWindow from "./QuizWindow";
import Progress from "./Progress";

interface StartProps {
  username: string;
  onLogOut: () => void;
}

interface Sum {
  first: number;
  second: number;
}

function Start({ username, onLogOut }: StartProps): JSX.Element {
  // Refs
  const startContainerRef = useRef<HTMLElement>(null);

  // State
  const [message, setMessage] = useState<string>("Good luck!");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [sum, setSum] = useState<Sum>({
    first: 0,
    second: 0,
  });

  // Handle sum answer
  const onAnswerHandler = (answer: number): void => {
    // Start game
    setIsPlaying(true);

    // Handle correct & incorrect
    if (sum.first + sum.second === answer) {
      setMessage("Correct!");
      setIsCorrect(true);
      setScore((prev) => prev + 10);
    } else {
      setMessage("Try again!");
      setIsCorrect(false);
      if (score !== 0) setScore((prev) => prev - 5);
    }

    // Populate next sum
    generateSum();
  };

  // Helper fn to generate and return a sum
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

  // Load fade-in transition
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
        <QuizWindow sum={sum} onAnswer={onAnswerHandler} />
        <Progress
          isPlaying={isPlaying}
          message={message}
          isCorrect={isCorrect}
          score={score}
        />
      </main>
    </section>
  );
}

export default Start;
