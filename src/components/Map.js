import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = () => {
  let map;
  const createMap = (position) => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      center: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      },
      zoom: 10
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
  }

  const getCoords = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject/*, options*/);
    });
  }

  useEffect(() => {
    getCoords()
      .then(pos => createMap(pos));
  }, []);

  return (
    <div id="map-copntainer">
      {!map && <h2>Fetching Map</h2>}
      <div id="map" />
    </div>
  )
}

export default Map;
