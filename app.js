var MongoProcess = require('./MongoProcess');
var Scraper = require('./Scraper');
var ReadFiles = require('./ReadFiles');
var fs = require('fs');
var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 3;
var collection = 'thairath';
var filepath = 'UrlPath.txt';

  var myPromise =  new Promise(function (fulfill, reject){
      ReadFiles.readUrl(filepath,function(err, res){
        if (err) reject(err);
        else fulfill(res);

      });
    });


  // store all urls in a global variable
  function getUrlPath(MasterUrlPath){
  /*  while(MasterUrlPath.length){
      var url = MasterUrlPath.pop();
      var limit = numberOfRequests;
      while (limit > 0) {
        Pages.push(url + (limit));
        limit--;
      }
    }*/
    console.log('ll');
  };

  function generateUrls(limit) {

    MongoProcess.select(collection, function(message){
      //console.log(message);
    });

    var url = MasterUrlPath.pop();

    while (limit > 0) {
      Pages.push(url + (limit));
      limit--;
    }

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

myPromise.then(getUrlPath).then(function(){
 console.log('success');
});
