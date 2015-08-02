var app = angular.module('app', ['ui.bootstrap']);
// iso country conversion from Mephisto here:
// https://gist.github.com/maephisto/9228207

var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

var getCountryName = function (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
};
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