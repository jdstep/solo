app.factory('WeatherFactory', function($http) {

  var getServerWeathers = function(lat, lon) {
    return $http({
      method: 'GET',
      url: '/api/weather',
      params: {lat: lat, lon: lon}
    });
  };

  return {
    getServerWeathers: getServerWeathers
  };

});