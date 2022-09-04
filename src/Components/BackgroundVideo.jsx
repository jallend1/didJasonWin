import VictoryVideo from '../images/win.mp4';
import DefeatVideo from '../images/defeat.mp4';
import LoadingVideo from '../images/loading.mp4';
import NotYetVideo from '../images/notyet.mp4';

const BackgroundVideo = ({ theResult = '🎉 Yes. 🎉' }) => {
  return (
    <div className="background-video">
      {theResult === '🎉 Yes. 🎉' && (
        <video autoPlay muted loop>
          <source src={VictoryVideo} type="video/mp4" />
        </video>
      )}
      {theResult === 'No!' && (
        <video autoPlay muted loop>
          <source src={DefeatVideo} type="video/mp4" />
        </video>
      )}
      {theResult === 'Researching the topic...' && (
        <video autoPlay muted loop>
          <source src={LoadingVideo} type="video/mp4" />
        </video>
      )}
      {theResult === 'Not Yet.' && (
        <video autoPlay muted loop>
          <source src={NotYetVideo} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default BackgroundVideo;
