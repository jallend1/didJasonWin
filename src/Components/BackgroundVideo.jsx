import VictoryVideo from '../images/win.mp4';
import DefeatVideo from '../images/defeat.mp4';
import LoadingVideo from '../images/loading.mp4';
import NotYetVideo from '../images/notyet.mp4';

const BackgroundVideo = ({ gameResults, isReadyToLoadVideo }) => {
  const backgroundVideos = {
    win: VictoryVideo,
    lose: DefeatVideo,
    pending: NotYetVideo,
    loading: LoadingVideo
  };

  return (
    <div className="background-video" key={gameResults}>
      <video autoPlay muted loop>
        <source src={backgroundVideos[gameResults]} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;

// {gameResults === 'win' && (
//     <video autoPlay muted loop>
//       <source src={VictoryVideo} type="video/mp4" />
//     </video>
//   )}
//   {gameResults === 'loss' && (
//     <video autoPlay muted loop>
//       <source src={DefeatVideo} type="video/mp4" />
//     </video>
//   )}
//   {gameResults === 'loading' && (
//     <video autoPlay muted loop>
//       <source src={LoadingVideo} type="video/mp4" />
//     </video>
//   )}
//   {gameResults === 'pending' && (
//     <video autoPlay muted loop>
//       <source src={NotYetVideo} type="video/mp4" />
//     </video>
//   )}
