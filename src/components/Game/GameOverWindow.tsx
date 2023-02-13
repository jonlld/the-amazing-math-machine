import { UserData } from "../../models/interfaces";

interface GameOverProps {
  score: number;
  highscore: number;
  onPlayAgain: () => void;
  onChoose: () => void;
  userStats: UserData | null;
}

const GameOverWindow = ({
  score,
  highscore,
  onPlayAgain,
  onChoose,
  userStats,
}: GameOverProps): JSX.Element => {
  // TODO
  // ADD STATS VIEW
  console.log(`You have played ${userStats?.scoreHistory.length} games!`);
  console.log(userStats?.scoreHistory);

  const playHandler = (): void => {
    onPlayAgain();
  };

  const chooseHandler = (): void => {
    onChoose();
  };

  return (
    <section className="game-over--container fade-in-slide-up">
      <h1 className="game-over--heading">Game Over!</h1>
      <p className="game-over--score">
        Your <span>score</span> was <span>{score}.</span>
        {score > 0 ? "Great job!" : "Better luck next time!"}
      </p>
      {highscore > 0 && (
        <p className="game-over--score">
          Your <span>highscore</span> is <span>{highscore}!</span>
        </p>
      )}
      <button className="btn btn__play-again" onClick={playHandler}>
        Play Again
      </button>
      <button className="btn" onClick={chooseHandler}>
        Choose Game Type
      </button>
    </section>
  );
};

export default GameOverWindow;
