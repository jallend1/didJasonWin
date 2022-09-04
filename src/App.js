import { useEffect, useState } from 'react';

import BackgroundVideo from './Components/BackgroundVideo';
import Results from './Components/Results';

function App() {
  const fetchURL = 'https://api.chess.com/pub/player/jallend1/games';
  const [activeGames, setActiveGames] = useState(null);
  const [gameArchive, setGameArchive] = useState(null);

  const fetchActiveGames = () => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then(({ games }) => {
        setActiveGames([...games]);
      });
  };

  // Fetches Active Games (if any)
  useEffect(fetchActiveGames, []);

  // Fetches Archive
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

    const fetchMonthlyArchive = () => {
      const [currentYear, currentMonth] = getDateInfo();
      fetch(fetchURL + `/${currentYear}/${currentMonth}`)
        .then((res) => res.json())
        .then(({ games }) => {
          setGameArchive([...games]);
        });
    };

    fetchMonthlyArchive();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Hello there</header>
      <BackgroundVideo theResults="🎉 Yes. 🎉" />
      <Results theResults="🎉 Yes. 🎉" />
    </div>
  );
}

export default App;
