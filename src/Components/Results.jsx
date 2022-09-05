const Results = ({ displayedMessage }) => {
  return (
    <div className="results">
      <h2>Did Jason beat Papa today?</h2>
      <h1>{displayedMessage}</h1>
    </div>
  );
};

export default Results;
