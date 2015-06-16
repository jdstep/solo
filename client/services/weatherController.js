app.controller('weatherController', ['$scope', 'WeatherFactory', function($scope, WeatherFactory) {
  $scope.message = "hello";

  $scope.weather;

  $scope.places = [];

  $scope.place1 = {};

  $scope.place2 = {};

  $scope.place3 = {};

  // $scope.coors = {};;

  $scope.genCoordinates = function() {
    var coors = {};
    coors.lat = Math.random() * 180;
    coors.lon = Math.random() * 180;
    return coors;
  };

  $scope.setWeather = function(place, data) {
    $scope[place] = data;
    $scope.places.push($scope[place]);
  };


  $scope.getWeathers = function(place) {
    var coordinates = $scope.genCoordinates();

    WeatherFactory.getServerWeathers(coordinates.lat, coordinates.lon).then(function(dataObj) {
      var data = angular.fromJson(dataObj.data);

      if (data.cod === '404') {
        console.log('coordinates do not point to a city');
        return $scope.getWeathers(place);
      } else {
        // console.log(data);
        $scope.setWeather(place, data);
        // console.dir($scope.weather);
        // $scope.place1 = $scope.weather;    
      }
    });

  };

 

  $scope.getWeathers('place1');
  $scope.getWeathers('place2');
  $scope.getWeathers('place3');



}]);