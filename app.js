
var url = require('url');
var request = require('request');
var URL = require('url-parse');
var express = require('express');
var app = express();
var crawler = require('./crawler.js');
var elast = require('./elastic.js');

elast.search();
var connectMongo = require('./connection.js');
app.get('/temp', function(req, res) {

    console.log(tmp);
});

app.get('/', function(req, res) {
    // var tmp = crawler.getData('http://www.thairath.co.th/content/3');
    // console.log(JSON.stringify(tmp));
    //  res.send(tmp);
  crawler.getData('http://www.thairath.co.th/content/880611', function(document) {
    connectMongo.insert(document, function(message){
        console.log(message);
    });
  });

});

/* var check = true;
  do{
    crawler.getData('http://www.thairath.co.th/content/3', function(err, content) {
        if (err) {
            console.error("Got an error", err);
        } else {
            console.log(content);
        }
    });
  }
  while(check)

*/
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
