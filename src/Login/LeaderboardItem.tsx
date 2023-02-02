import { LeaderboardProps } from "../models/interfaces";

function LeaderboardItem({ user }: LeaderboardProps): JSX.Element {
  const formattedUser = user.username.toUpperCase();

  return (
    <li className="leaderboard--listitem">
      <div className="leaderboard--listitem__user">{formattedUser}</div>
      <div className="leaderboard--listitem__score">{user.highscore}</div>
    </li>
  );
}

export default LeaderboardItem;
