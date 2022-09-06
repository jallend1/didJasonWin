import { useState, useEffect } from 'react';
// import Celebration from "./images/celebration.jpg";
import VictoryVideo from './images/win.mp4';
import DefeatVideo from './images/defeat.mp4';
import LoadingVideo from './images/loading.mp4';
import NotYetVideo from './images/notyet.mp4';

// Potential States:
// Win
// Loss
// Draw
// Undetermined

function App() {
  const [theAnswer, setTheAnswer] = useState('Researching the topic...');
  const [yearAndMonthArray, setYearAndMonthArray] = useState(null);
  const [activeGames, setActiveGames] = useState();
  const [currentMonthArchive, setCurrentMonthArchive] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  // const [latestGame, setLatestGame] = useState(null);

  // Sets up date information for API endpoint
  useEffect(() => {
    const formatCurrentMonth = (currentDate) => {
      // Ensures month is in two digit format endpoint requires
      let currentMonth = currentDate.getMonth() + 1;
      if (currentMonth < 10) currentMonth = '0' + currentMonth;
      return currentMonth;
    };

    const getDateInfo = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = formatCurrentMonth(currentDate);
      return [currentYear, currentMonth];
    };

    setYearAndMonthArray(getDateInfo());
  }, []);

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

  // const convertUnixTime = (chessTime) => {
  //   return new Date(chessTime * 1000).toString();
  // };

  useEffect(() => {
    const checkPapaOpponent = (game) => {
      // Verifies that one of the active games DOES indeed involve Papa
      return game.black === 'https://api.chess.com/pub/player/dchessmeister1' ||
        game.white === 'https://api.chess.com/pub/player/dchessmeister1'
        ? true
        : false;
    };

    if (activeGames) {
    }
  }, [activeGames]);

  useEffect(() => {
    const getFetchURL = (isRetrievingArchive = false) => {
      // Returns fetch URL based on whether its returning the monthly archive or active games
      if (isRetrievingArchive) {
        return `https://api.chess.com/pub/player/jallend1/games/${yearAndMonthArray[0]}/${yearAndMonthArray[1]}`;
      } else {
        return 'https://api.chess.com/pub/player/jallend1/games';
      }
    };

    const fetchActiveGames = () => {
      // Fetches any ongoing games in case it's unfinished for the day
      if (yearAndMonthArray) {
        fetch(getFetchURL())
          .then((res) => res.json())
          .then(({ games }) => {
            setActiveGames([...games]);
          });
      }
    };

    const fetchMonthlyArchive = () => {
      if (yearAndMonthArray) {
        fetch(getFetchURL(true))
          .then((res) => res.json())
          .then(({ games }) => {
            setActiveGames([...games]);
          });
      }
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

    // fetchChess();
    fetchActiveGames();
    fetchMonthlyArchive();
  }, [yearAndMonthArray]);
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
