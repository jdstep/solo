app.factory('WeatherFactory', ['$http', function($http) {

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
      url: 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + lat + ',' + lon + '&heading=151.78&pitch=-0.76'
    });
  };

  var getCityData = function(lat, lon) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon
    });
  };

  var fToCelsius = function(fTemp) {
    return (fTemp - 32) * (5 / 9);
  };

  return {
    getServerWeather: getServerWeather,
    getStreetView: getStreetView,
    getCityData: getCityData,
    fToCelsius: fToCelsius
  };

}]);

