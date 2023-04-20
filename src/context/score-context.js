import React from "react";

// createContext - takes default value, returns object containing Provider component
const ScoreContext = React.createContext({
  highscore: 0,
});

export default ScoreContext;
