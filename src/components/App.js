import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Map from './Map';
import Home from './Home';
import Directions from './Directions';

const App = () => {
  const [mode, setMode] = useState(''); //mode belongs in redux
  const history = useHistory();
  const [positionState, setPositionState] = useState();

  const goToMap = (type) => {
    setMode(type);
    history.push('/map')
  }

  return (
    <div id="app-container">
      <Route
        exact path="/" render={() =>
        (<Home
          history={history} goToMap={goToMap}
        />)}
      />
      <Route
        path="/map" render={() =>
        (<Map
          history={history} mode={mode} setMode={setMode}
          positionState={positionState} setPositionState={setPositionState}
        />)}
      />
      <Route
        path="/directions" render={() =>
        (<Directions
          history={history} positionState={positionState}
          setPositionState={setPositionState}
        />)}
      />
    </div>
  )
}

export default App;
