var Crawler = require("node-webcrawler");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var connect = require('./connection');
var c = new Crawler();


module.exports = {
    getData: function(url) {
      var result;
      var headers = {
          'User-Agent':       'Super Agent/0.0.1',
      //    'Content-Type':     'application/x-www-form-urlencoded'
          }
      var options = {
          url: url,
          method: 'GET',
          headers: headers
          }

      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(body)

          var date = $('time').text();
          var title = $('section[id=headerContent] h1').text();
          var content = $('section[id=mainContent]').text().trim();

          result = {"PostDate":date ,"Title": title, "Content": content};
        }
        else {
          console.log("We’ve encountered an error: " + error);
        }
      });

    }
};
