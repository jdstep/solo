app.controller('weatherController', ['$scope', 'WeatherFactory', function($scope, WeatherFactory) {
  $scope.message = "hello";

  $scope.weather;

  $scope.places = [];

  $scope.place1 = {};

  $scope.place2 = {};

  $scope.place3 = {};

  // $scope.coors = {};;

  $scope.pic = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76';

  var service = new google.maps.StreetViewService();

  var panoramaOptions = {
      // position: berkeley,
      disableDefaultUI: true,
      scrollwheel: false
    };

  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);


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
    console.log($scope[place]);
    $scope.getPanorama($scope[place]);
  };

  $scope.getPanoramaAndWeather = function() {
    var coors = $scope.genCoordinates();

    var coordinates = new google.maps.LatLng(coors.lat, coors.lng);

    console.dir(coordinates);

    console.log("trying to set the panorama");
    
    service.getPanoramaByLocation(coordinates, 100000, function(panoData, status) {
      if (status === 'ZERO_RESULTS') {
        return $scope.getPanoramaAndWeather();
      }

      WeatherFactory.getServerWeather(coordinates.A, coordinates.F).then(function(dataObj) {
        var weatherData = angular.fromJson(dataObj.data);
        if (weatherData.cod === '404') {
          console.log('coordinates do not point to a city');
          return $scope.getPanoramaAndWeather();
        } else {
          // console.log(weatherDate);
          panorama.setPano(panoData.location.pano);
          panorama.setVisible(true);
          $scope.place1 = weatherData;
          // $scope.setWeather(place, weatherData);
          // console.dir($scope.weather);
          // $scope.place1 = $scope.weather;    
        }
      }); 
      
    });

  };

  $scope.getPanorama = function(placeObj) {
    // google.maps.StreetViewService.getPanoramaByLocation(placeObj.coord, 10000000, function(data, status) {
    //   console.log(data);
    // });

  

    // console.log('trying to get coordinates from ' + placeObj);
    console.dir(placeObj);
    var coordinates = new google.maps.LatLng(placeObj.coord.lat, placeObj.coord.lon);

    console.log('coordinates are now' + coordinates);

    console.log("trying to set the panorama");
   
    service.getPanoramaByLocation(coordinates, 100000, function(data, status) {

      console.log('about to show data');
      console.dir(data);    
      console.log('panorama status is', status);    
      panorama.setPano(data.location.pano);
      panorama.setVisible(true);


    });
  };


  $scope.getWeather = function(place) {
    var coordinates = $scope.genCoordinates();

    console.log('coordinates are ' + coordinates);

    WeatherFactory.getServerWeather(coordinates.lat, coordinates.lng).then(function(dataObj) {
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


  // $scope.getWeather('place1');
  // $scope.getWeather('place2');
  // $scope.getWeather('place3');

  $scope.getPanoramaAndWeather();



}]);