import { useState, useEffect } from 'react';

import { Container, Alert, Table, InputGroup, FormControl, Button } from 'react-bootstrap';

import './Circle.css'


export const ConnectFour = (props) => {
  const [tableBodyHtml, setTableBodyHtml] = useState([]),

        [game, setGame] = useState([]),
        [question, setQuestion] = useState(""),
        [answer, setAnswer] = useState(""),
        [userAnswer, setUserAnswer] = useState(""),
        [player, setPlayer] = useState("red"),
        [feedback, setFeedback] = useState(""),

        [table, setTable] = useState(
        [...Array(6)].map(_ => Array(7).fill('w'))
        ),

        [column, setColumn] = useState(0),
        [questionNumber, setQuestionNumber] = useState(0),

        [renderResults, setRenderResults] = useState(false),

        feedbackTime = props.feedbackTime;


  const makeMove = () => {
    if (userAnswer.slice() === answer) {
      setFeedback('correct');
      throwBall();
    } else {
      setFeedback('wrong');
    }
  }

  const checkWin = (row, column, playerChar) => {
    try {
      if (
        (table[row][column] === playerChar) &&
        (table[row + 1][column] === playerChar) &&
        (table[row + 2][column] === playerChar) &&
        (table[row + 3][column] === playerChar)
      ) {
        setRenderResults(true);
        return 0;
      }
    } catch{}

    for (let p = 0; p < 4; p++) {
      try {
        if (
          (table[row][column + p] === playerChar) &&
          (table[row][column + p - 1] === playerChar) &&
          (table[row][column + p - 2] === playerChar) &&
          (table[row][column + p - 3] === playerChar)
        ) {
          setRenderResults(true);
          return 0;
        }
      } catch{}

      try {
        if (
          (table[row - p][column - p] === playerChar) &&
          (table[row + 1 - p][column + 1 - p] === playerChar) &&
          (table[row + 2 - p][column + 2 - p] === playerChar) &&
          (table[row + 3 - p][column + 3 - p] === playerChar)
        ) {
          setRenderResults(true);
          return 0;
        }
      } catch{}

      try {
        if (
          (table[row - p][column + p] === playerChar) &&
          (table[row + 1 - p][column - 1 + p] === playerChar) &&
          (table[row + 2 - p][column - 2 + p] === playerChar) &&
          (table[row + 3 - p][column - 3 + p] === playerChar)
        ) {
          setRenderResults(true);
          return 0;
        }
      } catch{}

    }
  }


  const throwBall = () => {
    var localTable = table;
    var playerChar = (player === 'red' ? 'r' : 'y');

    for (let i = 5; i >= 0; i--) {
      if (localTable[i][column] === 'w') {
        localTable[i][column] = playerChar;
        setTable(localTable);

        const func = setTimeout(() => { checkWin(i, column, playerChar); }, feedbackTime);
        return () => clearTimeout(func);
      }
    }
  };


  useEffect(() => {
    var gameArray = [];

    for (let array of Object.values(props.game)) {
      gameArray = gameArray.concat(array);
    }

    setGame(gameArray.sort(() => Math.random() - 0.5));
  }, [props.game]);


  useEffect(() => {
    const whiteCircle = <div className="circle bg-white"></div>,
          redCircle = <div className="circle bg-danger"></div>,
          yellowCircle = <div className="circle bg-warning"></div>;

    var html = [];

    for (let row of table) {
      var rowhtml = [];

      for (let data of row) {
        rowhtml.push(
          <td className="bg-primary">
            { data === 'w' ? (<>{whiteCircle}</>): (
              <>
                { data === 'r' ? (<>{redCircle}</>): (<>{yellowCircle}</>)}
              </>
            )}
          </td>
        );
      }
      html.push(<tr> { rowhtml } </tr>);
    }

    setTableBodyHtml(html);
  }, [table, feedback]);


  useEffect(() => {
    if (feedback) {
      const func = setTimeout(() => {
        setFeedback('');
        setAnswer('');
        setUserAnswer('');
        setQuestion('');

        if (player === 'red') { setPlayer('yellow'); }
        else { setPlayer('red'); }

      }, feedbackTime);

      return () => clearTimeout(func);
    }
  }, [feedback, player, feedbackTime]);


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
              onClick={() => { makeMove(); }}
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


      <br />

      <div className="border border-3 bg-primary border-primary rounded-3">
        <Table
          className={
            `table-responsive-sm table-sm
             table-primary text-primary
             border-primary border
             border-5 hover`
          }
        >
          <thead>
            <tr>
              <th colSpan="7" className="text-dark">
                <center>
                  <h3 className="h3"><strong>Vier gewinnt</strong></h3>
                </center>
              </th>
            </tr>
            <tr>
              { Array(7).fill().map((_, i) => {
                return (
                  <th colSpan="scope" className="bg-primary">
                    <center>
                      <Button
                        className={`
                          ${question !== '' ? ('disabled'): null }
                          ${renderResults ? ('disabled'): null }
                          ${table[0][i] !== 'w' ? ('disabled'): null }
                        `}

                        variant="outline-light btn-lg border"
                        onClick={() => {
                          setQuestion(game[questionNumber].question);
                          setAnswer(game[questionNumber].answer);
                          setColumn(i);

                          if ( questionNumber + 1 >= game.length) {
                            setQuestionNumber(0);
                          } else {
                            setQuestionNumber(questionNumber + 1);
                          }
                        }}
                      >
                        <h1 className="h1"> &darr; </h1>
                      </Button>
                    </center>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            { tableBodyHtml }
          </tbody>
        </Table>
      </div>

      <hr />

      { !renderResults ? (
        <h3 className={`h3 text-${ player === 'red' ? ('danger'): 'warning' } `}>
          { player === 'red' ? ('Rot'): 'Gelb' } ist dran.
        </h3>
      ): (
        <Alert variant={`${ player === 'red' ? ('warning'): 'danger' } `}>
          <h3 className={`h3 text-${ player === 'red' ? ('warning'): 'danger' } `}>
            { player === 'red' ? ('Gelb'): 'Rot' } hat gewonnen.
          </h3>
        </Alert>
      ) }

    </Container>
  );
}
