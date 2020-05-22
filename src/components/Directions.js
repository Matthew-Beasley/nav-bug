import React, { useEffect, useState, useReducer } from 'react';
import tt from '@tomtom-international/web-sdk-services';
import { getCoords } from '../Utilities';

const Directions = ({ positionState, setPositionState }) => {
  const [destAddress, setDestAddress] = useState('');
  const [startAddress, setStartAddress] = useState();
  const [directions, setDirections] = useState([]);
  let destCoords;

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
      query: destAddress
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
    const locations = `${longitude},${latitude}:${lng},${lat}`

    const { routes } = await tt.services.calculateRoute({
      locations,
      instructionsType: 'text',
      key: 'lhdNJtemDRfjctoDTw5DqAYs2qr9uloY',
    }).go()

    const routesDirections = routes.map(route => {
      const { instructions } = route.guidance
      setDirections(instructions.map(i => {
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
        return result
      }))
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
      <input
        type="text" placeholder="destination" value={destAddress}
        onChange={(ev) => setDestAddress(ev.target.value)}
      />
      <button type="button" onClick={() => getRoute()}>Get Directions</button>
      <button type="button" onClick={() => setDirections([])}>Clear</button>
      <div id="directions">
        {directions.length === 0 && <img src="../assets/ladybug.jpg" />}
        <ul>
          {directions.map(dir => {
            return (
              <li key={dir}>{dir}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Directions;
