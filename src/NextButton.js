function NextButton({ dispatch, answer, index, numQuest }) {
  if (answer === null) return null;
  if (index < numQuest - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuest" })}
      >
        Next
      </button>
    );

  if (index === numQuest - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
