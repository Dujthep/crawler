var MongoProcess = require('./MongoProcess');
var Scraper = require('./Scraper');
var ReadFiles = require('./ReadFiles');
var fs = require('fs');
var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 3;
var collection = 'thairath';


  function readFile(){
    ReadFiles.readUrl(function(url){
      MasterUrlPath = url;
      console.log(MasterUrlPath);
    });
  }

  // store all urls in a global variable
  function getUrlPath(){
    while(MasterUrlPath.length){
      Pages = generateUrls(numberOfRequests);
    }
  };

  function generateUrls(limit) {

    MongoProcess.select(collection, function(message){
      //console.log(message);
    });

    var url = MasterUrlPath.pop();
    var urls = [];
    while (limit > 0) {
      urls.push(url + (limit));
      limit--;
    }
    return urls;
  };

  function wizard() {

    if (!Pages.length) {
      return console.log('Done!!!!');
    }

    var url = Pages.pop();
    var scraper = new Scraper(url);

    scraper.on('error', function (error) {
      console.log(error + ' : ' + url);
      wizard();
    });

    scraper.on('complete', function (data) {
        //store the results in database
        MongoProcess.insert(data, collection, function(message){
          console.log(message);
        });
      wizard();
    });
  };

readFile();
