var ThairatScraper = require('../Scrapers/ThairatScraper');
var MongoProcess = require('../MongoProcess');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Pages = [];

function ThairatController (url,NumRequests,Collection) {
    this.url = url;
    this.numRequests = NumRequests;
    this.Collection = Collection;
    this.init();
}

ThairatController.prototype.init = function () {
  var self = this;
  for(var i=1; i < self.numRequests; i++){
    Pages.push(self.url + (i));
  }
  self.wizard();
};

ThairatController.prototype.wizard = function () {
    var self = this;
    if (Pages.length) {
      var url = Pages.shift();
      var scraper = new ThairatScraper(url);

      scraper.on('error', function(error) {
          console.log(error + ' : ' + url);
          self.wizard();
      });

      /*
       * Store the results in database when complete
      **/
      scraper.on('complete', function(data) {

           //console.log('Complete : ' + url);
           MongoProcess.insert(data, self.Collection, function(err,message) {
              if(err) return console.log(err);
              console.log(message);
           });
      /*  elastic.insert(data, function(err,message) {
            if(err) return console.log(err);
            console.log(message);
          }); */
          self.wizard();
      });
    }
};

module.exports = ThairatController;
