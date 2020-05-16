import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = () => {
  let map;
  const createMap = () => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      //style: 'tomtom://vector/1/basic-main',
      basePath: 'sdk',
      source: 'vector',
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
  }

  const getCoords = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  const fly = (position) => {
    const { coords } = position;
    //map.setCenter([coords.longitude, coords.latitude]);
    //map.setZoom(14);
    map.flyTo({
      center: { lat: coords.latitude, lng: coords.longitude },
      zoom: 13
    })
  }

  useEffect(() => {
    createMap();
    getCoords()
      .then(pos => fly(pos));
  }, []);

  return (
    <div id="map-copntainer">
      {!map && <h2>Fetching Map</h2>}
      <div id="map" />
    </div>
  )
}

export default Map;
