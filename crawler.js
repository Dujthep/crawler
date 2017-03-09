var Crawler = require("node-webcrawler");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var connect = require('./connection');
var c = new Crawler();


module.exports = {
    getData: function(url, callback) {
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
        if(error) return callback(error);

        var $ = cheerio.load(body)

        var date = $('time').text().trim();
        var title = $('section[id=headerContent] h1').text().trim();
        var content = $('section[id=mainContent]').text().trim();

        result = JSON.stringify({
                     'PostDate' : date,
                     'Title' : title,
                     'Content' : content
                   });

        callback(result);
      });
    }
};
