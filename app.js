
var url = require('url');
var request = require('request');
var URL = require('url-parse');
var express = require('express');
var app = express();
var connect = require('./connection');
var crawlering = require('./crawler.js');

app.get('/temp', function(req, res) {
    var temp = crawlering.getData('http://www.thairath.co.th/content/3');
});

app.get('/', function(req, res) {
    res.send('Hello Worldddd!');
    var tmp = connect.select();
    console.log(tmp);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
