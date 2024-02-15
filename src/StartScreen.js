function StartScreen({ numQuest, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome</h2>
      <h3>{numQuest} questions to test your React mastery </h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
