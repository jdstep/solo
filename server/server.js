var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var cors = require('cors');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

module.exports = app;

// sends the index on load
app.get('/', function(req, res) {
    res.sendFile('index.html');
});



 
// gets weather data based on inputted coordinates
app.get('/api/weather', function(req, res) {
  // console.log(req.query);
  var lat = req.query.lat;
  var lon = req.query.lon;
  console.log('lat ' + lat + 'lon ' + lon);
  var apiKey = '7b0ed8759039f9abcb76bfb7987a193c';
  var requestAPICall = 'https://api.forecast.io/forecast/7b0ed8759039f9abcb76bfb7987a193c/' + lat + ',' + lon;
  // var requestAPICall = 'https://api.forecast.io/forecast/7b0ed8759039f9abcb76bfb7987a193c/51,1';

  // request('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial' + '&APPID=774321dc5f42638e28e60f6c63e16902', function(err, apires, body) {
    request(requestAPICall, function(err, apires, body) {
    if (err) {
      // console.error(err);
      res.status(500).send('Error getting API data from server');
    } else {
      // console.log(body);
      res.json(body);
    }
  });
});