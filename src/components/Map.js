import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = () => {
  let map;

  const centerMap = (position) => {
    map.flyTo({
      center: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      },
      zoom: 14 // you can also specify zoom level
    })
  }

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      centerMap(position);
    });
  }

  useEffect(() => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      style: 'tomtom://vector/1/basic-main'
    });
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
  }, []);

  useEffect(() => {
    getCoords()
  }, [map]);

  return (
    <div id="map" />
  )
}

export default Map;
