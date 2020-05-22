import React, { useEffect, useState } from 'react';
import { modes } from '../constants';

const Home = ({ history, goToMap }) => {

  return (
    <div id="home-container">
      <h1>Nav Bug</h1>
      <img id="ladybug-img" src="../../assets/ladybug.jpg" />
      <div className="home-navbar">
        <button type="button" onClick={() => goToMap(modes.V_BASIC_MAIN)}>Street Map</button>
        <button type="button" onClick={() => goToMap(modes.V_BASIC_NIGHT)}>Dark Street Map</button>
        <button type="button" onClick={() => history.push('/directions')}>Directions</button>
      </div>
    </div>
  )
}

export default Home;

