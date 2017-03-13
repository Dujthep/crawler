var Crawler = require("node-webcrawler");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');




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
        if(!error && response.statusCode == 200){
          var $ = cheerio.load(body)


          var date = $('time').text().trim();
          var title = $('section[id=headerContent] h1').text().trim();
          var content = $('section[id=mainContent]').text().trim();
          var img = [];

          $('section[id=mainContent] img').each(function(i, element){
            var src = $(element).attr("src");
            img.push(src);
          });

          result = {  'URL'  : url,
                      'PostDate' : date,
                      'Title' : title,
                      'Content' : content,
                      'Image'  : img
                     };

          callback(result);

        }
      });
    }
};
