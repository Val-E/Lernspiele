import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Play } from './components/Play';
import { CreateGame } from './components/CreateGame';
import { Rules } from './components/Rules';


export const App = () => {
  return (
    <div className="App">
      <Tabs
        defaultActiveKey="play"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="play" title="Spiel spielen" >
          <Play />
        </Tab>
        <Tab eventKey="create-set" title="Spiel Erstellen">
          <CreateGame />
        </Tab>
        <Tab eventKey="set-rules" title="Regeln lesen">
          <Rules />
        </Tab>
      </Tabs>

      <h5 className="h5">&copy; 2022 Valentin Svet</h5>
      <h5 className="h5">valentin.svet.12345(at)gmail.com</h5>
    </div>
  );
}
