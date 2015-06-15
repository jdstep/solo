app.controller('weatherController', ['$scope', 'WeatherFactory', function($scope, WeatherFactory) {
  $scope.message = "hello";

  $scope.weather;

  $scope.place1 = {};

  // $scope.coors = {};;

  $scope.genCoordinates = function() {
    var coors = {};
    coors.lat = Math.random() * 180;
    coors.lon = Math.random() * 180;
    return coors;
  };


  $scope.getWeathers = function() {
    var coordinates = $scope.genCoordinates();

    WeatherFactory.getServerWeathers(coordinates.lat, coordinates.lon).then(function(dataObj) {
      var data = angular.fromJson(dataObj.data);

      if (data.cod === '404') {
        console.log('coordinates do not point to a city');
        return $scope.getWeathers();
      } else {
        console.log(data);
        $scope.place1 = data;
        // console.dir($scope.weather);
        // $scope.place1 = $scope.weather;    
      }
    });

  };

  $scope.getWeathers();

}]);