import BackgroundVideo from './Components/BackgroundVideo';
import Results from './Components/Results';

function App() {
  return (
    <div className="App">
      <header className="App-header">Hello there</header>
      <BackgroundVideo theResults="🎉 Yes. 🎉" />
      <Results theResults="🎉 Yes. 🎉" />
    </div>
  );
}

export default App;
