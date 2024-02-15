import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import QS from "./question";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuizQS from "./QuizQS";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemain: 600,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const idxQuest = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === idxQuest.correctOption
            ? state.points + idxQuest.points
            : state.points,
      };
    case "nextQuest":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        timeRemain: state.timeRemain - 1,
        status: state.timeRemain === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, timeRemain },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuest = questions.length;
  const maxPoint = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    dispatch({ type: "dataRecived", payload: QS.questions });
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuest={numQuest} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuest={numQuest}
              points={points}
              maxPoint={maxPoint}
              answer={answer}
            />
            <QuizQS
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} timeRemain={timeRemain} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuest={numQuest}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoint={maxPoint}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
