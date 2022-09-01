import { useState, useEffect } from 'react';
// import Celebration from "./images/celebration.jpg";
import VictoryVideo from './images/win.mp4';
import DefeatVideo from './images/defeat.mp4';
import LoadingVideo from './images/loading.mp4';

function App() {
  const [theAnswer, setTheAnswer] = useState('...Loading');

  const formatCurrentMonth = (currentDate) => {
    let currentMonth = currentDate.getMonth() + 1;
    // API requires double digit month
    if (currentMonth < 10) currentMonth = '0' + currentMonth;
    return currentMonth;
  };

  const translateChessCode = (chessCode) => {
    if (chessCode === 'win') setTheAnswer('🎉 Yes. 🎉');
    else if (chessCode === 'agree' || chessCode === 'stalemate') {
      setTheAnswer('It was a tie :(');
    } else {
      setTheAnswer('No!');
    }
  };

  const loadCorrectVideo = () => {
    if (theAnswer === 'Loading...') return LoadingVideo;
    else if (theAnswer === '🎉 Yes. 🎉') return VictoryVideo;
    else if (theAnswer === 'No.') return DefeatVideo;
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
        console.log(games);
        const mostRecentGame = games[games.length - 1];
        let chessCode;
        if (mostRecentGame.black.username === 'jallend1') {
          chessCode = mostRecentGame.black.result;
        } else {
          chessCode = mostRecentGame.white.result;
        }
        translateChessCode(chessCode);
      });
  };

  const fetchChess = () => {
    // Checks for active games
    fetch('https://api.chess.com/pub/player/jallend1/games')
      .then((res) => res.json())
      .then(({ games }) => {
        console.log(games);
        // Temporarily check to see if games equal to 0 for debugging
        if (games.length === 1) {
          setTheAnswer('Not Yet.');
        } else {
          retrieveLatestGame();
        }
      });
  };

  const determineCorrectVideo = () => {};

  useEffect(fetchChess, []);

  return (
    <div className="App">
      <video autoPlay muted loop>
        {theAnswer === '🎉 Yes. 🎉' && (
          <source src={VictoryVideo} type="video/mp4" />
        )}
        {theAnswer === 'No.' && <source src={DefeatVideo} type="video/mp4" />}
        {theAnswer === 'Loading...' && (
          <source src={LoadingVideo} type="video/mp4" />
        )}
      </video>
      <div className="results">
        <h2>Did Jason beat Papa today?</h2>
        <h1>{theAnswer}</h1>
      </div>
    </div>
  );
}

export default App;
