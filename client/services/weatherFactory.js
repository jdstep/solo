app.factory('WeatherFactory', function($http) {

  var getServerWeather = function(lat, lon) {
    return $http({
      method: 'GET',
      url: '/api/weather',
      params: {lat: lat, lon: lon}
    });
  };

  var getStreetView = function(lat, lon) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76'
    });
  };

  var fToCelsius = function(fTemp) {
    return (fTemp - 32) * (5 / 9);
  };

  return {
    getServerWeather: getServerWeather,
    getStreetView: getStreetView,
    fToCelsius: fToCelsius
  };

});

