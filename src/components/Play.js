import { useState } from 'react';

import { Alert, Form } from 'react-bootstrap';

import { Quiz } from './Quiz';
import { Pairs } from './Pairs';
import { ConnectFour } from './ConnectFour';


export const Play = () => {
  const [gameCode, setGameCode] = useState({}),
        [game, setGame] = useState(""),

        [feedbackTime, setFeedbackTime] = useState(3000),
        [playerNumber, setPlayerNumber] = useState(0);

  return (
    <Alert variant="primary">
      <Alert.Heading>
        <h3 variant="h3">Lernspiele</h3>
        <hr />
      </Alert.Heading>

      { game === '' ? (
        <>
          <p>
            Erstellen Sie ein Set an Fragen f&uuml;r eine Runde Pairs, Vier Gewinnt oder eine Quizrunde.
          </p>
          <hr />

          <Form>
            <Form.Group className="mb-3 form-floating" controlId="GameCode">
              <Form.Control
                as="textarea"
                placeholder="Spiele Code"
                onChange={e => setGameCode(JSON.parse(e.target.value))}
                aria-label="Code"
              />
              <Form.Label>Spiele Code</Form.Label>
              <Form.Text className="text-muted">
                Sollten Sie ein Set bereits erstellt haben, tragen Sie bitte den Code hier ein!
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 form-floating" controlId="PlayerNumber">
              <Form.Control
                type="number"
                placeholder="Anzahl an Spielern"
                onChange={e => setPlayerNumber(Math.round(Math.abs(e.target.value))) }
                aria-label="Player Number"
              />
              <Form.Label>Anzahl an Spielern</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3 form-floating" controlId="QuestionTime">
              <Form.Control
                type="number"
                placeholder="Zeit zum Lesen der R&uuml;ckmeldung in Sekunden"
                onChange={e => setFeedbackTime(Math.round(Math.abs(e.target.value * 1000))) }
                aria-label="Feedback TIme"
              />
              <Form.Label>Zeit zum Lesen der R&uuml;ckmeldung in Sekunden</Form.Label>
            </Form.Group>

            <div className="mb-3">
              <Form.Check
                className="on"
                inline
                type="radio"
                label="Quiz"
                id="quiz"
                name="selectGame"
                onClick={e => setGame("quiz")}
              />
              <Form.Check
                inline
                type="radio"
                label="Pairs"
                id="pairs"
                name="selectGame"
                onClick={e => setGame("pairs")}
              />
              <Form.Check
                inline
                type="radio"
                label="Vier Gewinnt"
                id="four_in_a_row"
                name="selectGame"
                onClick={e => setGame("four_in_a_row")}
              />
            </div>
          </Form>
        </>
      ): null}

      <center>
        <div>
          { game === "quiz" ? (
            <Quiz game={gameCode} playerNumber={playerNumber} feedbackTime={feedbackTime} />
          ): (
            <>
              { game === "pairs" ? (
                <Pairs game={gameCode} playerNumber={playerNumber} feedbackTime={feedbackTime} />
              ): (
                <>
                  { game=== "four_in_a_row" ? (
                    <ConnectFour game={gameCode} feedbackTime={feedbackTime} />
                  ): null }
                </>
              )}
            </>
          )}
        </div>
      </center>
    </Alert>
  );
}
