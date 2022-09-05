import VictoryVideo from '../images/win.mp4';
import DefeatVideo from '../images/defeat.mp4';
import LoadingVideo from '../images/loading.mp4';
import NotYetVideo from '../images/notyet.mp4';

const BackgroundVideo = ({ gameResults }) => {
  return (
    <div className="background-video">
      {gameResults === 'win' && (
        <video autoPlay muted loop>
          <source src={VictoryVideo} type="video/mp4" />
        </video>
      )}
      {gameResults === 'loss' && (
        <video autoPlay muted loop>
          <source src={DefeatVideo} type="video/mp4" />
        </video>
      )}
      {gameResults === 'loading' && (
        <video autoPlay muted loop>
          <source src={LoadingVideo} type="video/mp4" />
        </video>
      )}
      {gameResults === 'pending' && (
        <video autoPlay muted loop>
          <source src={NotYetVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default BackgroundVideo;
