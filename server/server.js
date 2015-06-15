var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var bluebird = require('bluebird');
var cors = require('cors');

var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

module.exports = app;

app.get('/', function(req, res) {
    res.sendFile('index.html');
});
 
app.get('/api/weather', function(req, res) {
  console.log(req.query);
  var lat = req.query.lat;
  var lon = req.query.lon;

  console.log(lat, lon);

  request('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial', function(err, apires, body) {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting API data from server');
    } else {
      // console.log(body);
      res.json(body);
    }
  });
});