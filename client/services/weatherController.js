app.controller('weatherController', ['$scope', 'WeatherFactory', function($scope, WeatherFactory) {
  $scope.message = "hello";

  $scope.weather;

  $scope.places = [];

  $scope.place1 = {};

  $scope.place2 = {};

  $scope.place3 = {};

  // $scope.coors = {};;

  $scope.pic = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76';

  $scope.genCoordinates = function() {
    var coors = {};
    coors.lat = Math.random() * 60;
    coors.lat = coors.lat * (Math.round(Math.random()) * 2 - 1)
    coors.lng = Math.random() * 130;
    coors.lng = coors.lng * (Math.round(Math.random()) * 2 - 1)

    console.dir(coors);
    return coors;
  };

  $scope.setWeather = function(place, data) {
    $scope[place] = data;
    // $scope[place].pic = $scope.getStreetViewUrl($scope[place]);
    $scope.places.push($scope[place]);
    console.log($scope.places);
  };

  $scope.getPanorama = function(placeObj) {
    // google.maps.StreetViewService.getPanoramaByLocation(placeObj.coord, 10000000, function(data, status) {
    //   console.log(data);
    // });
    var service = new google.maps.StreetViewService();
    // console.log(service);
    service.getPanoramaByLocation({lat: 37.7833, lng: 122.4167}, 10000, function(data, status) {
          console.log(data);
    });
  };


  $scope.getWeather = function(place) {
    var coordinates = $scope.genCoordinates();

    WeatherFactory.getServerWeather(coordinates.lat, coordinates.lon).then(function(dataObj) {
      var data = angular.fromJson(dataObj.data);
      if (data.cod === '404') {
        console.log('coordinates do not point to a city');
        return $scope.getWeather(place);
      } else {
        // console.log(data);
        $scope.setWeather(place, data);
        // console.dir($scope.weather);
        // $scope.place1 = $scope.weather;    
      }
    });

  };

  $scope.getWeather('place1');
  $scope.getWeather('place2');
  $scope.getWeather('place3');

  $scope.getPanorama($scope.place1);



}]);