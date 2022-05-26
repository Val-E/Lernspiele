import { useState, useEffect } from 'react';

import { Container, Alert, Table, Button } from 'react-bootstrap';

import './Table.css';


export const Pairs = (props) => {
  const [questionTable, setQuestionTable] = useState([]),
        [answerTable, setAnswerTable] = useState([]),
        [resultContainer, setResultContainer] = useState([]),

        [question, setQuestion] = useState(""),
        [answer, setAnswer] = useState(""),
        [correctAnswer, setCorrectAnswer] = useState(""),
        [questionID, setQuestionID] = useState(""),
        [answerID, setAnswerID] = useState(""),
        [feedback, setFeedback] = useState(""),

        [idx1, setIdx1] = useState([]),
        [idx2, setIdx2] = useState([]),
        [rowSize, setRowSize] = useState(0),

        [score, setScore] = useState(Array(props.playerNumber).fill(0)),
        [playerID, setPlayerID] = useState(0),
        [renderResults, setRenderResults] = useState(false),
        [buttonList] = useState([]),

        feedbackTime = props.feedbackTime;


  useEffect(() => {
	  var arr = [];
      for (let key of Object.keys(props.game)) {
        arr.push(...Array(props.game[Object.keys(props.game)[0]].length)
          .fill()
          .map((_, i) => { return {'key': key, 'id': i} })
        );
      }

      arr = arr.sort(() => Math.random() - 0.5);
      setIdx1(arr);

      arr = [...arr].sort(() => Math.random() - 0.5);
      setIdx2(arr);

      setRowSize(Math.round(Math.sqrt(arr.length + 1)));
  }, [props.game]);


  useEffect(() => {
    if (feedback) {
      const func = setTimeout(() => {
        setFeedback('');
        setCorrectAnswer('');
        setAnswer('');
        setQuestion('');

        if (feedback === "correct") {
          buttonList.push(questionID);
          buttonList.push(answerID);
        }
      }, feedbackTime);

      return () => clearTimeout(func);
    }
  }, [feedback, feedbackTime, answerID, buttonList, questionID]);


  useEffect(() => {
    var container = [];
    for (let i = 0; i < score.length; i++) {
      container.push(
        <button
          type="button"
          className={`btn position-relative ${ playerID === i ? "btn-primary": "btn-outline-primary" } `}
          margin='5px'
        >
          Spieler {i + 1}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            { score[i] }
          </span>
        </button>
      )
    }

    setResultContainer(container);
  }, [score, playerID, correctAnswer]);


  useEffect(() => {
    var container = [];
    for (let i = 0; i < score.length; i++) {
      container.push(
        <button
          type="button"
          className={`btn position-relative ${ playerID === i ? "btn-primary": "btn-outline-primary" } `}
          margin='5px'
        >
          Spieler {i + 1}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            { score[i] }
          </span>
        </button>
      )
    }

    setResultContainer(container);
  }, [score, playerID, correctAnswer]);


  useEffect(() => {
    const updateScore = (userAnswer) => {
      var playerScore = score;

      setCorrectAnswer(userAnswer);

      if (userAnswer.slice() === answer) {
        playerScore[playerID]++;
        setScore(playerScore);

        setFeedback('correct');

        if (buttonList.length > 2 * (Object.keys(props.game).length * (props.game[Object.keys(props.game)[0]].length - 1))) {
          setRenderResults(true);
        }

      } else {
        setFeedback('wrong');
        setAnswerID('');
        setQuestionID('');

        if (playerID < (score.length - 1)) {
          setPlayerID(playerID + 1);
        } else {
          setPlayerID(0);
        }
      }
    }


    var table = [],
	    row = [],
		i = 0;

	for (let tuple of idx1) {
	  i++;
      row.push(
        <td className="bg-primary">
          <center>
            <Button
              className={`
                ${buttonList.indexOf(`answer-${ tuple.key }-${ tuple.id }`) !== -1 ? ' visually-hidden ': ''}
                ${question === '' ? ' disabled ': ''}
                ${correctAnswer !== '' ? ' disabled ': ''}
              `}
              variant="warning"
              size="lg"
              onClick={() => {
                setAnswerID(`answer-${ tuple.key }-${ tuple.id }`);
                updateScore(props.game[ tuple.key ][ tuple.id ].answer);
              }}
            >
              Antwort { i }
            </Button>
          </center>
        </td>
      );

      if (i % rowSize === 0) {
        table.push(<tr>{row}</tr>);
        row = [];
      }
    }

    if (row !== []) {
      table.push(<tr>{row}</tr>);
    }

    setAnswerTable(table);


    table = [];
    row = [];
	i = 0;

	for (let tuple of idx2) {
	  i++;
      row.push(
        <td className="bg-primary">
          <center>
            <Button
              className={`
                ${buttonList.indexOf(`question-${ tuple.key }-${ tuple.id }`) !== -1 ? ' visually-hidden ': ''}
                ${question !== '' ? ' disabled ': ''}
              `}
              variant="danger"
              size="lg"
              onClick={() => {
                setQuestionID(`question-${ tuple.key }-${ tuple.id }`);
                setAnswer(props.game[ tuple.key ][ tuple.id ].answer);
                setQuestion(props.game[ tuple.key ][ tuple.id ].question);
              }}
            >
              Frage { i + 1 }
            </Button>
          </center>
        </td>
      );

      if (i % rowSize === 0) {
        table.push(<tr>{row}</tr>);
        row = [];
      }
    }

    if (row !== []) {
      table.push(<tr>{row}</tr>);
    }

    setQuestionTable(table);

  }, [
    question, answer, correctAnswer, buttonList,
    rowSize, idx1, idx2, props.game, playerID, score
  ]);


  return (
    <Container>
      { question !== '' ? (
        <Alert variant="danger" style={{"maxWidth": "650px", "overflow": "scroll"}}>
          <center>
            <h4 className="h4">Frage:</h4>
            <h5 className="h5">{ question }</h5>
          </center>
        </Alert>
      ): null }

      { correctAnswer !== '' ? (
        <Alert variant="warning" style={{"maxWidth": "650px", "overflow": "scroll"}}>
          <center>
            <h4 className="h4">Antwort:</h4>
            <h5 className="h5">{correctAnswer}</h5>
          </center>
        </Alert>
      ): null }

      { feedback !== '' ?  (
        <>
          <br />
          <hr />
          { feedback === 'correct' ? (
            <Alert variant="success" className="bg-success text-light">Richtig!</Alert>
          ): (
            <Alert variant="danger" className="bg-danger text-light">Falsch!</Alert>
          )}
          <hr />
          <br />
        </>
      ): null }

      <div className="table-container">
        <Table
          className={
            `table-responsive-sm table-sm
             table-primary text-light border
             border-white table-bordered
             border-3 hover`
          }
        >
		  <thead></thead>
          <tbody>
            <tr>
              <th colSpan={rowSize} className="bg-danger">
                <center>
                  Fragen
                </center>
              </th>
            </tr>
            { questionTable }
          </tbody>

          <tbody>
            <tr>
              <th colSpan={rowSize} className="text-dark bg-warning">
                <center>
                  Antworten
                </center>
              </th>
            </tr>
            { answerTable }
          </tbody>
        </Table>
      </div>

      { resultContainer }

      <br />
      <br />
      { renderResults ? (
        <Alert variant="warning">
          <h4 className="h4">
            Mit { Math.max(...score) } Punkt(en) gewinnt Spieler { score.indexOf(Math.max(...score), -1) + 1 }.
          </h4>
        </Alert>
      ): null }

    </Container>
  );
}
