import React, { useEffect, useState, useReducer } from 'react';
import tt, { services } from '@tomtom-international/web-sdk-services';
import { getCoords } from '../Utilities';

const Directions = ({ positionState, setPositionState }) => {
  const [sourceAddress, setSourceAddress] = useState('');
  const [startAddress, setStartAddress] = useState();
  let destCoords;

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleResponse = (response) => {
    const result = response.addresses[0];
    if (result && result.address.freeformAddress) {
      setStartAddress(result.address.freeformAddress);
    }
  };

  const getCurrentAddress = () => {
    const { longitude, latitude } = positionState.coords;
    tt.services.reverseGeocode({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      position: [longitude, latitude],
      language: 'en-US'
    })
    .go()
    .then(res => handleResponse(res))
    .catch(function (error) {
      console.log(error);
    })
  }

  const getDestinationCoords = async () => {
   const val = await tt.services.geocode({
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
      bestResult: true,
      query: '11025 24th ne seattle, wa'//startAddress
      })
      .go()
      .then(result => {
        console.log('result.position in then', result.position)
        return result.position;
      });
    destCoords = val;
  }

  const getRoute = async () => {
    await getDestinationCoords();
    const { longitude, latitude } = positionState.coords;
    const { lng, lat } = destCoords;
    //console.log(positionState.coordsGeolocationCoordinates)
    console.log('destcoords in getRoute', destCoords)
    //console.log('original long lat', longitude, latitude)
    const locations = `${longitude},${latitude}:${lng},${lat}`

    const { routes } = await tt.services.calculateRoute({
      locations,
      instructionsType: 'text',
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
    }).go()

    const routesDirections = routes.map(route => {
      const { instructions } = route.guidance
      return instructions.map(i => {
        let result = ''

        // eslint-disable-next-line default-case
        switch (i.maneuver) {
          case 'TURN_LEFT':
            result += '↰ '
            break
          case 'TURN_RIGHT':
            result += '↱  '
            break
          case 'ARRIVE_RIGHT':
          case 'ARRIVE:LEFT':
          case 'WAYPOINT_REACHED':
            result += '☑ '
            break;
        }
        result += i.message.replace('waypoint', 'pickup area')
        console.log(result)
        return result
      })
    })
  }

  useEffect(() => {
    if (positionState) {
      getCurrentAddress();
    }
  }, [positionState])

  useEffect(() => {
    getCoords()
      .then(pos => setPositionState(pos));
  }, []);

  return (
    <div id="directions-container">
      <input value={sourceAddress} onChange={ev => setSourceAddress(ev.target)} />
      <input type="button" onClick={() => getRoute()} />
      <div id="test">I'm here</div>
    </div>
  )
}

export default Directions;
