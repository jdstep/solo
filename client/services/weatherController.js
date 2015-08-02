app.controller('weatherController', ['$scope', 'WeatherFactory', '$interval', function($scope, WeatherFactory, $interval) {

  // stores the current place data containing panorama, weather, and condition data
  $scope.place = {};

  // queue of upcoming place objects
  // this is necessary to prevent a delay between submitting an ajax request
  // and showing the new place on the screen
  $scope.places = [];

  // FOR DEBUGGING
  // on page load, does not show the list of debug weather icons
  $scope.showList = false;


  // FOR DEBUGGING
  // toggles hiding and showing the debug conditions list 
  $scope.showHideList = function() {
    console.log('trying to show or hide list');
    $scope.showList = !$scope.showList;
  };

  // FOR DEBUGGING
  // when clicking the corresponding weather icon, sets the condition
  $scope.setClickCondition = function(condition) {
    console.log('trying to set the condition to' + condition);
    $scope.place._condition = condition;
  };

  // allows getting a panorama
  var service = new google.maps.StreetViewService();

  // disables UI elements on panorama
  var panoramaOptions = {
      disableDefaultUI: true,
      scrollwheel: false,
      draggable: false
    };

  // panorama that will be shown on the page, linked to the 'pano' ID
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

  // generates a set of random coordinates roughly excluding the arctic
  $scope.genCoordinates = function() {
    var coors = {};
    coors.lat = Math.random() * 60;
    coors.lat = coors.lat * (Math.round(Math.random()) * 2 - 1);
    coors.lng = Math.random() * 160;
    coors.lng = coors.lng * (Math.round(Math.random()) * 2 - 1);
    return coors;
  };

  // converts a condition ID from the weather API into
  // a string representing the condition for CSS class styling
  $scope.setCondition = function(conditionId) {
    var condition;
    
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
      condition = 'clear';
    } else if ( 800 <= conditionId && conditionId <= 899 ) {
      condition = 'clouds';
    } else if ( 900 <= conditionId && conditionId <= 949 ) {
      condition = 'extreme';
    } else if ( 950 <= conditionId && conditionId <= 962 ) {
      condition = 'wind';
    }
    return condition;
  };

  // long function that retrieves a panorama and weather data for a random set of coordinates
  // then stores that data in an object and pushes that into a queue
  $scope.getPanoramaAndWeather = function(firstTime) {

    // if there is already a place in the queue, eject from this function
    if ($scope.places.length >= 1) {
      return;
    }

    // a new place object to hold the panorama and weather data
    var newPlace = {};

    // make a set of random coordinates
    var coors = $scope.genCoordinates();

    // put the coordinates into a google maps coordinate object
    var coordinates = new google.maps.LatLng(coors.lat, coors.lng);
    
    // find a panorama within the specified radius
    service.getPanoramaByLocation(coordinates, 100000, function(panoData, status) {
      // if a panorama was not found within the specified radius
      if (status === 'ZERO_RESULTS') {
        // recursively call getPanoramaAndWeather with the data if it was the first call or not
        return $scope.getPanoramaAndWeather(firstTime);
      } 
      var panoramaLat = panoData.location.latLng.G;
      var panoramaLng = panoData.location.latLng.K;

      // get the weather for the current coordinates
      WeatherFactory.getServerWeather(panoramaLat, panoramaLng).then(function(dataObj) {
        // store the weather data from the ajax call
        var weatherData = angular.fromJson(dataObj.data);
        // if there was no weather found for the current location
        if (weatherData.cod === '404') {
          console.log('coordinates do not point to a city');
        // recursively call getPanoramaAndWeather with the data if it was the first call or not
          return $scope.getPanoramaAndWeather(firstTime);
        } 
        else {
          // sets the current condition for setting CSS styles
          newPlace._condition = $scope.setCondition(weatherData.weather[0].id);

          // store the panorama data
          newPlace._panoData = panoData;

          // temporarily store the country code from the weather data on the new place object
          var country = weatherData.sys.country;
          // get the name of the country based on the weather code
          var countryName = getCountryName(country);
          // store the full name of the country on the new place object
          newPlace._country = countryName;

          // store the weather data on the new place object
          newPlace._weather = weatherData;

          // store the farenheit temperature
          newPlace._farenheit = Math.round(newPlace._weather.main.temp);
          // store the celsius temperature
          newPlace._celsius = Math.round(WeatherFactory.fToCelsius(newPlace._farenheit));


          // add the place object to the queue
          $scope.places.push(newPlace);
          // if this was the first time we called the function (on loading)
          if (firstTime) {
            // show the new location immediately, rather than waiting for the interval show the location
            $scope.showNewPlace();
          }
        }
      }); 
      
    });

  };

  // renders the new panorama by getting the first item in the queue 
  $scope.showNewPlace = function() {
    if ($scope.places.length > 0) {
      panorama.setVisible(false);
      $scope.place = $scope.places.shift();
      panorama.setPano($scope.place._panoData.location.pano);
      panorama.setVisible(true);
    }
  };

  // on page load, gets the first panorama and weather data
  // must be called with 'true' so the panorama is rendered immediately
  $scope.getPanoramaAndWeather(true);
  
  // UNCOMMENT THESE INTERVAL CALLS TO LOOP
  $interval(function(){ $scope.getPanoramaAndWeather(false);}, 1000);
  $interval($scope.showNewPlace, 8000);


}]);


