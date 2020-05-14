import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = () => {
  let position;
  let map;

  //pk.ddaf8b479ce97d4e6ebf87d1605ee4ba
  const createMap = () => {
    //Add your LocationIQ Maps Access Token here (not the API token!)
    locationiq.key = 'pk.a5c3fbf2119bfb2275b62eddbccd76b3';
    //Define the map and configure the map's theme
    var map = new mapboxgl.Map({
      container: 'map',
      attributionControl: false, //need this to show a compact attribution icon (i) instead of the whole text
      zoom: 12,
      center: [-122.42, 37.779]
    });

    //Define layers you want to add to the layer controls; the first element will be the default layer
    var layerStyles = {
      Streets: 'streets/vector',
      Satellite: 'earth/raster',
      Hybrid: 'hybrid/vector',
      Dark: 'dark/vector',
      Light: 'light/vector'
    };

    map.addControl(new locationiqLayerControl({
      key: locationiq.key,
      layerStyles: layerStyles
    }), 'top-left');
  }

  useEffect(() => {
    createMap();
   // navigator.geolocation.getCurrentPosition(_position => {
   //   position = _position;
   //   console.log(position)
    //});
  }, [])


  return (
    <div id="map" />
  )
}

export default Map;
