import { useState, useEffect } from 'react';
// import Celebration from "./images/celebration.jpg";
import VictoryVideo from './images/win.mp4';
import DefeatVideo from './images/defeat.mp4';
import LoadingVideo from './images/loading.mp4';
import NotYetVideo from './images/notyet.mp4';

function App() {
  const [theAnswer, setTheAnswer] = useState('Researching the topic...');
  // const [latestGame, setLatestGame] = useState(null);

  const formatCurrentMonth = (currentDate) => {
    let currentMonth = currentDate.getMonth() + 1;
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

  // const getFetchURL = (isRetrievingArchive = false) => {
  //   if (isRetrievingArchive) {
  //     const [currentYear, currentMonth] = getDateInfo();
  //     return `https://api.chess.com/pub/player/jallend1/games/${currentYear}/${currentMonth}`;
  //   } else {
  //     return 'https://api.chess.com/pub/player/jallend1/games';
  //   }
  // };

  // const getDateInfo = () => {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = formatCurrentMonth(currentDate);
  //   return [currentYear, currentMonth];
  // };

  // const retrieveLatestGame = () => {
  //   fetch(getFetchURL(true))
  //     .then((res) => res.json())
  //     .then(({ games }) => {
  //       console.log(games);
  //       const mostRecentGame = games[games.length - 1];
  //       // TODO - Make sure the date on this matches the current date;
  //       // If not, return yesterday's results e.g. No, but he did yesterday, etc...
  //       // setLatestGame(mostRecentGame);
  //       let chessCode;
  //       if (mostRecentGame.black.username === 'jallend1') {
  //         chessCode = mostRecentGame.black.result;
  //       } else {
  //         chessCode = mostRecentGame.white.result;
  //       }
  //       translateChessCode(chessCode);
  //     });
  // };

  const checkPapaOpponent = (game) => {
    // Verifies that one of the active games DOES indeed involve Papa
    return game.black === 'https://api.chess.com/pub/player/dchessmeister1' ||
      game.white === 'https://api.chess.com/pub/player/dchessmeister1'
      ? true
      : false;
  };

  // const fetchChess = () => {
  //   // Checks for active games
  //   fetch(getFetchURL())
  //     .then((res) => res.json())
  //     .then(({ games }) => {
  //       console.log(games);
  //       // Temporarily check to see if games equal to 0 for debugging
  //       if (games.length === 1) {
  //         // If the game is against Papa, not yet
  //         if (checkPapaOpponent(games[0])) setTheAnswer('Not Yet.');
  //       } else {
  //         retrieveLatestGame();
  //       }
  //     });
  // };

  // const convertUnixTime = (chessTime) => {
  //   return new Date(chessTime * 1000).toString();
  // };

  // useEffect(fetchChess, []);

  useEffect(() => {
    const getFetchURL = (isRetrievingArchive = false) => {
      if (isRetrievingArchive) {
        const [currentYear, currentMonth] = getDateInfo();
        return `https://api.chess.com/pub/player/jallend1/games/${currentYear}/${currentMonth}`;
      } else {
        return 'https://api.chess.com/pub/player/jallend1/games';
      }
    };

    const getDateInfo = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = formatCurrentMonth(currentDate);
      return [currentYear, currentMonth];
    };

    const fetchChess = () => {
      // Checks for active games
      fetch(getFetchURL())
        .then((res) => res.json())
        .then(({ games }) => {
          console.log(games);
          // Temporarily check to see if games equal to 0 for debugging
          if (games.length === 1) {
            // If the game is against Papa, not yet
            if (checkPapaOpponent(games[0])) setTheAnswer('Not Yet.');
          } else {
            retrieveLatestGame();
          }
        });
    };

    const retrieveLatestGame = () => {
      fetch(getFetchURL(true))
        .then((res) => res.json())
        .then(({ games }) => {
          console.log(games);
          const mostRecentGame = games[games.length - 1];
          // TODO - Make sure the date on this matches the current date;
          // If not, return yesterday's results e.g. No, but he did yesterday, etc...
          // setLatestGame(mostRecentGame);
          let chessCode;
          if (mostRecentGame.black.username === 'jallend1') {
            chessCode = mostRecentGame.black.result;
          } else {
            chessCode = mostRecentGame.white.result;
          }
          translateChessCode(chessCode);
        });
    };

    fetchChess();
  }, []);

  return (
    <div className="App">
      {theAnswer === '🎉 Yes. 🎉' && (
        <video autoPlay muted loop>
          <source src={VictoryVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'No!' && (
        <video autoPlay muted loop>
          <source src={DefeatVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'Researching the topic...' && (
        <video autoPlay muted loop>
          <source src={LoadingVideo} type="video/mp4" />
        </video>
      )}
      {theAnswer === 'Not Yet.' && (
        <video autoPlay muted loop>
          <source src={NotYetVideo} type="video/mp4" />
        </video>
      )}

      <div className="results">
        <h2>Did Jason beat Papa today?</h2>
        <h1>{theAnswer}</h1>
      </div>
    </div>
  );
}

export default App;
