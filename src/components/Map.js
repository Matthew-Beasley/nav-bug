import React, { useState, useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { modes } from '../constants';

const Map = ({ history }) => {
  let map;
  const mapElementRef = useRef();

  const createMap = (position, mode) => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      style: mode,
      basePath: 'sdk',
      source: 'vector',
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
    const { coords } = position;
    map.on('load', () => {
      map.flyTo({
        center: {
          lat: coords.latitude,
          lng: coords.longitude
        },
        zoom: 14, // you can also specify zoom level
      })
    })
  }

  const getCoords = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000
    };
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  const changeMode = async (style) => {
    map = null;
    mapElementRef.current.innerHTML = '';
    console.log(mapElementRef)
    const position = await getCoords();
    createMap(position, style)
  }

  useEffect(() => {
    getCoords()
      .then(pos => createMap(pos));
  }, []);

  return (
    <div id="map-copntainer">
      {!map && <h2>Fetching Map</h2>}
      <div ref={mapElementRef} id="map" />
      <div className="map-navbar">
        <button type="button" onClick={() => changeMode(modes.V_BASIC_MAIN)}>Street Map</button>
        <button type="button" onClick={() => changeMode(modes.V_BASIC_NIGHT)}>Dark Street Map</button>
        <button type="button" onClick={() => history.push('/directions')}>Directions</button>
      </div>
    </div>
  )
}

export default Map;
