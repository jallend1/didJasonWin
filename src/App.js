import { useEffect, useState } from 'react';

import BackgroundVideo from './Components/BackgroundVideo';
import Results from './Components/Results';

function App() {
  const fetchURL = 'https://api.chess.com/pub/player/jallend1/games';
  const [gameResults, setGameResults] = useState('loading');
  const [displayedMessage, setDisplayedMessage] = useState(
    'And the verdict is...'
  );
  const [activeGames, setActiveGames] = useState(null);
  const [gameArchive, setGameArchive] = useState(null);
  const [latestGame, setLatestGame] = useState(null);

  // Potential States:
  // Win
  // Loss
  // Draw
  // Pending
  // Loading

  const checkActiveGameOpponent = () => {
    // IF there are active games, verifies that one of them DOES indeed involve Papa
    if (activeGames && activeGames.length > 0) {
      // If a Papa game is happening, reflect that in gameStatus. If not, do nothing and continue to archive assessment
      if (
        activeGames[0].black ===
          'https://api.chess.com/pub/player/dchessmeister1' ||
        activeGames[0].white ===
          'https://api.chess.com/pub/player/dchessmeister1'
      ) {
        setGameResults('pending');
      }
    }
  };

  const translateGameResult = () => {
    console.log(gameResults);
    if (gameResults !== 'loading') {
      setTimeout(() => {
        if (gameResults === 'win') setDisplayedMessage('🎉 Yes. 🎉');
        else if (gameResults === 'pending') setDisplayedMessage('Not Yet.');
        else if (gameResults === 'agree' || gameResults === 'stalemate') {
          setDisplayedMessage('It was a tie :(');
        } else {
          setDisplayedMessage('No!');
        }
      }, '4000');
    }
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

  useEffect(checkActiveGameOpponent, [activeGames]);
  useEffect(translateGameResult, [gameResults]);

  return (
    <div className="App">
      <BackgroundVideo gameResults={gameResults} />
      <Results displayedMessage={displayedMessage} />
    </div>
  );
}

export default App;
