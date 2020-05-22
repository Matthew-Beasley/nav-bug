const getCoords = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 3000
  };
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

const followCoords = () => {
  let id, target, options;

  function success(pos) {
    var crd = pos.coords;

    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulations, you reached the target');
      navigator.geolocation.clearWatch(id);
    }
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  target = {
    latitude: 0,
    longitude: 0
  };

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
  id = navigator.geolocation.watchPosition(success, error, options);
}

export { getCoords };