import { useState, useEffect } from 'react';

import { Container, Alert, Table, Button, InputGroup, FormControl } from 'react-bootstrap';


export const Quiz = (props) => {
  const [tableBody, setTableBody] = useState([]),
        [resultContainer, setResultContainer] = useState([]),

        [question, setQuestion] = useState(""),
        [answer, setAnswer] = useState(""),
        [userAnswer, setUserAnswer] = useState(""),
        [feedback, setFeedback] = useState(""),

        [score, setScore] = useState(Array(props.playerNumber).fill(0)),
        [playerID, setPlayerID] = useState(0),
        [renderResults, setRenderResults] = useState(false),
        [buttonList] = useState([]),

        game = props.game,
        feedbackTime = props.feedbackTime;

  console.log(feedbackTime);


  const updateScore = () => {
    var playerScore = score;

    if (userAnswer.slice() === answer) {
      playerScore[playerID]++;
      setFeedback('correct');
    } else {
      playerScore[playerID]--;
      setFeedback('false');
    }

    setScore(playerScore);

    if (playerID < (score.length - 1)) {
      setPlayerID(playerID + 1);
    } else {
      setPlayerID(0);
    }

    if (buttonList.length > (Object.keys(game).length * game[Object.keys(game)[0]].length - 1)) {
      setRenderResults(true);
    }

  };


  useEffect(() => {
    var container = [];
    for (let i = 0; i < score.length; i++) {
      container.push(
        <button
          type="button"
          className={`btn position-relative ${ playerID === i ? "btn-primary": "btn-outline-primary" } `}
          style={{ 'margin': '5px' }}
        >
          Spieler {i + 1}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            { score[i] }
          </span>
        </button>
      )
    }

    setResultContainer(container);
  }, [score, playerID]);


  useEffect(() => {
    if (feedback) {
      const func = setTimeout(() => {
        setQuestion('');
        setFeedback('');
        setAnswer('');
        setUserAnswer('');
      }, feedbackTime);

      return () => clearTimeout(func);
    }
  }, [feedback, feedbackTime]);


  useEffect(() => {
    var table = [];

    if (Object.keys(game).length === 0) {
      return null;
    }

    for (let i = 0; i < game[Object.keys(game)[0]].length; i++) {
      table.push(
        <tr id={`row-${i}`}>
          { Object.keys(game).map((category) => {
            return (
              <td className="bg-primary">
                <center>
                  <Button
                    className={`
                      ${buttonList.indexOf(`${category}-${i + 1}`) !== -1 ? 'visually-hidden ': ''}
                      ${question !== '' ? 'disabled': ''}
                    `}
                    variant="danger"
                    size="lg"
                    id={`${category}-${i + 1}`}
                    onClick={(e) => {
                      setAnswer(game[category][i].answer);
                      setQuestion(game[category][i].question);
                      buttonList.push(`${category}-${i + 1}`);
                    }}
                  >
                    Frage {i + 1}
                  </Button>
                </center>
              </td>
            );
          })}
        </tr>
      );
    }

    setTableBody(table);
  }, [game, props.playerNumber, question, buttonList]);


  return (
    <Container>
      { feedback !== '' ?  (
        <>
          { feedback === 'correct' ? (
            <Alert variant="success">{userAnswer} war richtig.</Alert>
          ): (
            <Alert variant="danger">{userAnswer} war falsch. Richtig w&auml;re {answer}</Alert>
          )}
        </>
      ): null }

      { (question !== '') && (feedback === '') ? (
        <center>
          <h3 className="h3">Frage:</h3>
          <h5 className="h5" style={{maxWidth: 700, overflow: 'scroll'}}>{question}</h5>
          <br />

          <InputGroup className="mb-3 float">
            <Button 
              variant="primary"
              size="lg"
              id="submitButton"
              onClick={() => {
                updateScore();
              }}
            >
              Antwort abgeben!
            </Button>
            <FormControl
              onChange={e => setUserAnswer(e.target.value)}
              type="text"
              aria-label="answer"
            />
          </InputGroup>
          <br />
        </center>
      ): null }

      { Object.keys(game).length > 0 ? (
        <div className="table-container">
          <Table
            className={
              `table-responsive-sm table-sm
               table-primary text-light border
               border-white table-bordered
               border-3 hover`
            }
          >
            <thead className="thead">
              <tr>
                { Object.keys(game).map((category) => {
                  return (
                    <th scope="col" className="bg-danger" minWidt='200px'>
                      <center>
                        {category}
                      </center>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              { tableBody }
            </tbody>
          </Table>
        </div>
      ): null }

      <br />

      { resultContainer }

      <br />
      <br />
      { renderResults ? (
        <Alert variant="warning">
          <h4 className="h4">
            Mit { Math.max(...score) } Punkt(en) gewinnt Spieler { score.lastIndexOf(Math.max(...score)) + 1 }.
          </h4>
        </Alert>
      ): null }

    </Container>
  );
}
