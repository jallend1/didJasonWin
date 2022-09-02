import { useState, useEffect } from 'react';
// import Celebration from "./images/celebration.jpg";
import VictoryVideo from './images/win.mp4';
import DefeatVideo from './images/defeat.mp4';
import LoadingVideo from './images/loading.mp4';
import NotYetVideo from './images/notyet.mp4';

function App() {
  const [theAnswer, setTheAnswer] = useState('Loading...');
  const [latestGame, setLatestGame] = useState(null);

  const formatCurrentMonth = (currentDate) => {
    let currentMonth = currentDate.getMonth() + 1;
    // API requires double digit month
    if (currentMonth < 10) currentMonth = '0' + currentMonth;
    return currentMonth;
  };

  const translateChessCode = (chessCode) => {
    setTimeout(() => {
      if (chessCode === 'win') setTheAnswer('🎉 Yes. 🎉');
      else if (chessCode === 'agree' || chessCode === 'stalemate') {
        setTheAnswer('It was a tie :(');
      } else {
        setTheAnswer('No!');
      }
    }, '4000');
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
        // TODO - Make sure the date on this matches the current date;
        // If not, return yesterday's results e.g. No, but he did yesterday, etc...
        setLatestGame(mostRecentGame);
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

  const convertUnixTime = (chessTime) => {
    return new Date(chessTime * 1000).toString();
  };

  useEffect(fetchChess, []);

  return (
    <div className="App">
      {theAnswer === '🎉 Yes. 🎉' && (
        <video autoPlay muted loop>
          <source src={VictoryVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'No.' && (
        <video autoPlay muted loop>
          <source src={DefeatVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'Loading...' && (
        <video autoPlay muted loop>
          <source src={LoadingVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'Not yet.' && (
        <video autoPlay muted loop>
          <source src={NotYetVideo} type="video/mp4" />
        </video>
      )}

      <div className="results">
        <h2>Did Jason beat Papa today?</h2>
        <h1>{theAnswer}</h1>
        {/* {latestGame && theAnswer !== 'Loading...' ? (
          <div>
            <a href={latestGame.url}>Link</a>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default App;
