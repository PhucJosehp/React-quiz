function QuizQS({ question, answer, dispatch }) {
  const hasAnsered = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, idx) => (
          <button
            className={`btn btn-option ${idx === answer ? "answer" : ""} ${
              hasAnsered
                ? idx === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnsered}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: idx })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQS;
