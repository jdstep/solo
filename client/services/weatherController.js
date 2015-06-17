app.controller('weatherController', ['$scope', 'WeatherFactory', '$interval', function($scope, WeatherFactory, $interval) {
  $scope.message = "hello";

  $scope.place = {};

  $scope.places = [];

  $scope.showList = false;


  $scope.showHideList = function() {
    console.log('trying to show or hide list');
    $scope.showList = !$scope.showList;
  };

  $scope.setClickCondition = function(condition) {
    console.log('trying to set the condition to' + condition);
    $scope.place._condition = condition;
  };

  var service = new google.maps.StreetViewService();

  var panoramaOptions = {
      disableDefaultUI: true,
      scrollwheel: false
    };

  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

  $scope.fade = false;

  $scope.genCoordinates = function() {
    var coors = {};
    coors.lat = Math.random() * 60;
    coors.lat = coors.lat * (Math.round(Math.random()) * 2 - 1)
    coors.lng = Math.random() * 160;
    coors.lng = coors.lng * (Math.round(Math.random()) * 2 - 1)
    return coors;
  };

  $scope.setCondition = function(conditionId) {
    var condition;
    // conditionId = parseInt(conditionId);
    // console.log(conditionId);
    if (200 <= conditionId && conditionId <= 299) {
      condition = 'thunderstorm';
    } else if ( 300 <= conditionId && conditionId <= 399 ) {
      condition = 'drizzle';
    } else if ( 500 <= conditionId && conditionId <= 599 ) {
      condition = 'rain';
    } else if ( 600 <= conditionId && conditionId <= 699 ) {
      condition = 'snow';
    } else if ( 700 <= conditionId && conditionId <= 799 ) {
      condition = 'atmosphere';
    } else if (conditionId === 800) {
      condition = 'clear'
    } else if ( 800 <= conditionId && conditionId <= 899 ) {
      condition = 'clouds';
    } else if ( 900 <= conditionId && conditionId <= 949 ) {
      condition = 'extreme';
    } else if ( 950 <= conditionId && conditionId <= 962 ) {
      condition = 'wind';
    }
    return condition;
  };

  $scope.getPanoramaAndWeather = function(firstTime) {

    if ($scope.places.length >= 1) {
      return;
    }

    var newPlace = {};

    var coors = $scope.genCoordinates();

    var coordinates = new google.maps.LatLng(coors.lat, coors.lng);
    
    service.getPanoramaByLocation(coordinates, 100000, function(panoData, status) {
      if (status === 'ZERO_RESULTS') {
        return $scope.getPanoramaAndWeather(firstTime);
      }

      WeatherFactory.getServerWeather(coordinates.A, coordinates.F).then(function(dataObj) {
        var weatherData = angular.fromJson(dataObj.data);

        if (weatherData.cod === '404') {
          console.log('coordinates do not point to a city');
          return $scope.getPanoramaAndWeather(firstTime);
        } 
        else {
          newPlace._condition = $scope.setCondition(weatherData.weather[0].id);

          console.dir(weatherData);
          newPlace._panoData = panoData;

          var country = weatherData.sys.country;
          var countryName = getCountryName(country);
          newPlace._country = countryName;
          newPlace._weather = weatherData;
          $scope.places.push(newPlace);
          if (firstTime) {
            console.log('calling for the first time and places length is ' + $scope.places.length);
            $scope.showNewPlace();
          }
        }
      }); 
      
    });

  };

  $scope.showNewPlace = function() {
    if ($scope.places.length > 0) {
      panorama.setVisible(false);
      $scope.place = $scope.places.shift();
      panorama.setPano($scope.place._panoData.location.pano);
      panorama.setVisible(true);
    }
  };


  $scope.getPanoramaAndWeather(true);
  
  // UNCOMMENT THIS TO LOOP
  $interval(function(){ $scope.getPanoramaAndWeather(false)}, 1000);

  $interval($scope.showNewPlace, 5000);





}]);