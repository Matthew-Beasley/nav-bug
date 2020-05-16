import React, { useState } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import Map from './Map';
import Home from './Home';

const App = () => {
  const [mode, setMode] = useState(''); //mode belongs in redux
  const history = useHistory();

  const goToMap = (type) => {
    setMode(type);
    history.push('/map')
  }

  return (
    <div id="app-container">
      <Route exact path="/" render={() => <Home history={history} goToMap={goToMap} />} />
      <Route path="/map" render={() => <Map history={history} mode={mode} setMode={setMode} />} />
    </div>
  )
}

export default App;
