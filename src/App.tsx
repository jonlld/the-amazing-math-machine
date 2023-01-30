import React, { useState } from "react";
import Welcome from "./Welcome";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = "Test User";

  return (
    <div>
      {!isLoggedIn && <Welcome isLoggedIn={isLoggedIn} username={user} />}
    </div>
  );
}

export default App;
