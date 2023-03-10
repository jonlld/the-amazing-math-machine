import { UserData } from "../../models/interfaces";

interface LeaderboardProps {
  user: UserData;
  login: (user: UserData) => void;
}

function LeaderboardItem({ user, login }: LeaderboardProps): JSX.Element {
  const formattedName = user.username.toUpperCase();

  const clickHandler = () => {
    login(user);
  };

  return (
    <li className="leaderboard--listitem">
      <button className="leaderboard--listitem__user" onClick={clickHandler}>
        {formattedName}
      </button>
      <p className="leaderboard--listitem__score">{user.highscore}</p>
    </li>
  );
}

export default LeaderboardItem;
