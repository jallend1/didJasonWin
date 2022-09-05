import { useEffect, useState } from 'react';
import BackgroundVideo from './Components/BackgroundVideo';
import Results from './Components/Results';

const resultStates = {
  win: '🎉 Yes. 🎉',
  loss: 'No!',
  draw: 'It was a tie :(',
  pending: 'Not Yet.',
  loading: 'And the verdict is...'
};

function App() {
  const fetchURL = 'https://api.chess.com/pub/player/jallend1/games';
  const [gameResults, setGameResults] = useState('loading');
  const [displayedMessage, setDisplayedMessage] = useState(
    resultStates.loading
  );
  const [activeGames, setActiveGames] = useState(null);
  const [gameArchive, setGameArchive] = useState(null);
  const [gameCode, setGameCode] = useState(null);

  const checkActiveGameOpponent = () => {
    // IF there are active games, verifies that one of them DOES indeed involve Papa
    if (activeGames && activeGames.length > 0) {
      // If a Papa game is happening, reflect that in gameCode. If not, reflect Chess Dot Com code
      if (
        activeGames[0].black ===
          'https://api.chess.com/pub/player/dchessmeister1' ||
        activeGames[0].white ===
          'https://api.chess.com/pub/player/dchessmeister1'
      ) {
        setGameCode('pending');
      }
    } else if (gameArchive) {
      const mostRecentGame = gameArchive[gameArchive.length - 1];
      if (mostRecentGame.black.username === 'jallend1') {
        setGameCode(mostRecentGame.black.result);
      } else {
        setGameCode(mostRecentGame.white.result);
      }
    }
  };

  const translateGameResult = () => {
    if (
      gameCode === 'agree' ||
      gameCode === 'stalemate' ||
      gameCode === 'repetition' ||
      gameCode === 'insufficient'
    )
      setGameResults('draw');
    else setGameResults(gameCode);
  };

  const displayGameOutcome = () => {
    setTimeout(() => {
      setDisplayedMessage(resultStates[gameResults]);
    }, '4000');
  };

  // Fetches Games and Puts them in State
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

    const fetchActiveGames = () => {
      fetch(fetchURL)
        .then((res) => res.json())
        .then(({ games }) => {
          setActiveGames([...games]);
        });
    };

    const fetchArchiveGames = () => {
      const [currentYear, currentMonth] = getDateInfo();
      fetch(fetchURL + `/${currentYear}/${currentMonth}`)
        .then((res) => res.json())
        .then(({ games }) => {
          setGameArchive([...games]);
        });
    };

    fetchActiveGames();
    fetchArchiveGames();
  }, []);

  useEffect(checkActiveGameOpponent, [activeGames, gameArchive]);
  useEffect(translateGameResult, [gameCode]);
  useEffect(displayGameOutcome, [gameResults]);

  return (
    <div className="App">
      <BackgroundVideo gameResults={gameResults} />
      <Results displayedMessage={displayedMessage} />
    </div>
  );
}

export default App;
