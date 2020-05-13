import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = () => {
  let position;
  let map;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(_position => {
      position = _position;
      console.log(position)
    });
  }, [])

  useEffect(() => {
    map = tt.map({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      container: 'map',
      style: 'tomtom://vector/1/basic-main'
    });

    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
  }, [position]);

  useEffect(() => {
    /*
    navigator.geolocation.getCurrentPosition(_position => {
      position = _position;
      console.log(position)
    });
    */
    map.on('load', () => {
      map.flyTo({
        center: {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        },
        zoom: 14 // you can also specify zoom level
      })
    })
  }, [map]);

  return (
    <div id="map" />
  )
}

export default Map;
