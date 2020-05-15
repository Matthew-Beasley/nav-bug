import React, { useEffect, useState } from 'react';

const Home = ({ history }) => {
  return (
    <div id="home-container">
      <h1>Nav Bug</h1>
      <img id="ladybug-img" src="../../assets/ladybug.jpg" />
      <div className="home-navbar">
        <button type="button" onClick={() => history.push('/map')}>Load Map</button>
        <button type="button" onClick={() => history.push('/directions')}>Directions</button>
      </div>
    </div>
  )
}

export default Home;

