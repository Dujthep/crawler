
var url = require('url');
var request = require('request');
var URL = require('url-parse');
var express = require('express');
var app = express();
var crawler = require('./crawler.js');
var elast = require('./elastic.js');

app.get('/temp', function(req, res) {

    console.log(tmp);
});

app.get('/', function(req, res) {
    var tmp = crawler.getData('http://www.thairath.co.th/content/3');
    console.log(JSON.stringify(tmp));
  //  res.send(tmp);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
