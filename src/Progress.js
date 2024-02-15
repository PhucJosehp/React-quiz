function Progress({ index, numQuest, points, maxPoint, answer }) {
  return (
    <header className="progress">
      <progress max={numQuest} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuest}{" "}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoint}
      </p>
    </header>
  );
}

export default Progress;
