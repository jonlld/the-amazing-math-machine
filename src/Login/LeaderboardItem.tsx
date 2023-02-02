import { LeaderboardProps } from "../models/interfaces";

function LeaderboardItem({ user }: LeaderboardProps): JSX.Element {
  return (
    <li>
      {user.username}: {user.highscore}
    </li>
  );
}

export default LeaderboardItem;
