import React, { useState, useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { modes } from '../constants';
import { getCoords } from '../Utilities';

const Map = ({ history, positionState, setPositionState }) => {
  let map;
  const mapElementRef = useRef();

  const createMap = (location, mode) => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      style: mode,
      basePath: 'sdk',
      source: 'vector',
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
    const { coords } = location;
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

  const getPosition = async (style) => {
    map = null;
    mapElementRef.current.innerHTML = '';
    console.log(mapElementRef)
    const position = await getCoords();
    createMap(position, style)
  }

  useEffect(() => {
    getCoords()
      .then(pos => setPositionState(pos));
  },[]);

  useEffect(() => {
    if (positionState) {
      createMap(positionState, modes.V_BASIC_MAIN);
    }
  }, [positionState]);

  return (
    <div id="map-copntainer">
      {!map && <h2>Fetching Map</h2>}
      <div ref={mapElementRef} id="map" />
      <div className="map-navbar">
        <button type="button" onClick={() => getPosition(modes.V_BASIC_MAIN)}>Street Map</button>
        <button type="button" onClick={() => getPosition(modes.V_BASIC_NIGHT)}>Dark Street Map</button>
        <button type="button" onClick={() => history.push('/directions')}>Directions</button>
      </div>
    </div>
  )
}

export default Map;
