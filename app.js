var MongoProcess = require('./MongoProcess');
var Scraper = require('./Scraper');
var ReadFiles = require('./ReadFiles');
var elastic = require('./elastic');
var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 3;
var collection = 'thairath';
var filepath = 'UrlPath.txt';

  function readFile(){
    return new Promise(function(resolve, reject){
      ReadFiles.readUrl(filepath,function(data){
        resolve(data);
      });
    })
  }


  // store all urls in a global variable
  function generateUrls(MasterUrlPath){
    while(MasterUrlPath.length){
      var url = MasterUrlPath.pop();
      var limit = numberOfRequests;
      while (limit > 0) {
        Pages.push(url + (limit));
        limit--;
      }
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

readFile().then(function(result) {
    generateUrls(result);
}).then(function(result) {
    console.log(Pages);
}).catch(function (){
    console.log('catch');
});;
