import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import Map from './Map';
import Home from './Home';

const App = () => {
  const history = useHistory();
  return (
    <div id="app-container">
      <Route exact path="/" render={() => <Home history={history} />} />
      <Route path="/map" render={() => <Map />} />
    </div>
  )
}

export default App;
