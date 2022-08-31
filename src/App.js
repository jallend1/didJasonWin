import { useState, useEffect } from "react";

function App() {
  const [theAnswer, setTheAnswer] = useState("...Loading");

  const formatCurrentMonth = (currentDate) => {
    let currentMonth = currentDate.getMonth() + 1;
    // API requires double digit month
    if (currentMonth < 10) currentMonth = "0" + currentMonth;
    return currentMonth;
  };

  const retrieveLatestGame = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = formatCurrentMonth(currentDate);
    fetch(
      `https://api.chess.com/pub/player/jallend1/games/${currentYear}/${currentMonth}`
    )
      .then((res) => res.json())
      .then(({ games }) => {
        const mostRecentGame = games[games.length - 1];
        console.log(mostRecentGame.url);
        if (mostRecentGame.black.username === "jallend1") {
          console.log(mostRecentGame.black.result);
        } else {
          console.log(mostRecentGame.white.result);
        }
      });
  };

  const fetchChess = () => {
    // Checks for active games
    fetch("https://api.chess.com/pub/player/jallend1/games")
      .then((res) => res.json())
      .then(({ games }) => {
        console.log(games);
        // Temporarily check to see if games equal to 0 for debugging
        if (games.length === 0) {
          setTheAnswer("Not Yet.");
        } else {
          retrieveLatestGame();
        }
      });
  };

  useEffect(fetchChess, []);

  return (
    <div className="App">
      <h1>{theAnswer}</h1>
    </div>
  );
}

export default App;
