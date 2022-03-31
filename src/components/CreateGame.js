import { useState, useEffect } from 'react';

import { Alert, Form, InputGroup, FormControl, Button, Table } from 'react-bootstrap';

import './Table.css';


export const CreateGame = (props) => {
  const [questionNumber,  setQuestionNumber] = useState(0),
        [categoryNumber,  setCategoryNumber] = useState(0),
        [gameData, setGameData] = useState(null),
        [table, setTable] = useState([]);


  useEffect(() => {
    var categories = [];
    var questions = [];

    for (let i = 0; i < categoryNumber; i++) {
      categories.push(
        <th scope="col" style={{'minWidth': '200px'}}>
          <center>
            <Form.Group
              className="mb-3 form-floating text-dark"
              controlId={`category-${i + 1}`}
            >
              <Form.Control
                type="text"
                placeholder={`Kategorien Nr. ${i + 1}`}
                aria-label={`category-${i+1}`}
              />
              <Form.Label>Kategorien Nr. {i + 1}</Form.Label>
            </Form.Group>
          </center>
        </th>
      );
    }

    for (let i = 0; i < questionNumber; i++) {
      var row = [];
      for (let j = 0; j < categoryNumber; j++) {
        row.push(
          <td>
            <center>
              <Form.Group
                className="form-floating text-dark"
                controlId={`question-${i + 1}-${j + 1}`}
              >
                <Form.Control
                  type="text"
                  placeholder={`Frage ${i + 1}:${j + 1}`}
                  aria-label={`question-${i + 1}:${j + 1}`}
                />
                <Form.Label>Frage {i + 1}:{j + 1}</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-floating text-dark"
                controlId={`answer-${i + 1}-${j + 1}`}
              >
                <Form.Control
                  type="text"
                  placeholder={`Antwort ${i + 1}:${j + 1}`}
                  aria-label={`answer-${i + 1}:${j + 1}`}
                />
                <Form.Label>Antwort {i + 1}:{j + 1}</Form.Label>
              </Form.Group>
            </center>
          </td>
        );
      }
      questions.push(<tr>{row}</tr>);
    }

    setTable(
     <Table className="table-responsive-sm table-sm text-light border border-white table-bordered border-3 hover">
       <thead className="thead">
         <tr>
           { categories }
         </tr>
       </thead>
       <tbody>
         { questions }
       </tbody>
     </Table>
   );
  }, [questionNumber, categoryNumber]);


  return (
    <Alert variant="success">
      <Alert.Heading>
       Erstellen Sie ein Set.
      </Alert.Heading>

      <hr />

      <InputGroup className="mb-3 float">
        <InputGroup.Text className="bg-success text-light">
          Anzahl an Kategorien
        </InputGroup.Text>
        <FormControl
          onChange={e => setCategoryNumber(e.target.value)}
          type="number"
          aria-label="number_of_categories"
        />
      </InputGroup>

      <InputGroup className="mb-3 float">
        <InputGroup.Text className="bg-success text-light">
          Anzahl an Fragen
        </InputGroup.Text>
        <FormControl
          onChange={e => setQuestionNumber(e.target.value)}
          type="number"
          aria-label="number_of_questions"
        />
      </InputGroup>

      <div className="table-container">
        { table }
      </div>
      <br />

      { gameData ? (
        <>
          <hr />
          <br />
          <Form>
            <Form.Group className="mb-3 form-floating" controlId="GameCode">
              <Form.Control
                as="textarea"
                placeholder="Spiele Code"
                aria-label="Code"
                value={gameData}
              />
              <Form.Text className="text-muted">Spiele Code</Form.Text>
            </Form.Group>
          </Form>
          <hr />
        </>
      ): null }


      <Button
        className="btn-lg"
        variant="primary"
        onClick={ () => {
          var gameCode = {};

          for (let i = 0; i < categoryNumber; i++) {
            var categoryName = document.getElementById(`category-${i + 1}`).value;
            var questionTuple = [];

            for (let j = 0; j < questionNumber; j++) {
              var question = document.getElementById(`question-${j + 1}-${i + 1}`).value;
              var answer = document.getElementById(`answer-${j + 1}-${i + 1}`).value;

              questionTuple.push({
                'question': question,
                'answer': answer,
              });

            }

            gameCode[`${categoryName}`] = questionTuple;
          }

          setGameData(JSON.stringify(gameCode));
          navigator.clipboard.writeText(JSON.stringify(gameCode));
        }}
      >
        Code Kopieren!
      </Button>
    </Alert>
  );
}
