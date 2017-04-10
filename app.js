var MongoProcess = require('./MongoProcess');
var Scraper = require('./Scraper');
var ReadFiles = require('./ReadFiles');
var elastic = require('./elastic');

var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 5;
var Collection = null;
var filepath = 'UrlPath.txt';
var dateStart = Date.now();

function readFile() {
    return new Promise(function(resolve, reject) {
        ReadFiles.readUrl(filepath, function(data) {
            resolve(data);
        });
    }).then(function(result) {
        generateUrls(result);
    });
}


// store all urls in a global variable
function generateUrls(MasterUrlPath) {
    while (MasterUrlPath.length) {
        var url = MasterUrlPath.shift();
        Collection = url.substring(11, url.lastIndexOf('.co.th'));

        MongoProcess.select(Collection, function(docs) {
          docs.forEach(function(doc){
            console.log(doc);
          });
        });

        var limit = numberOfRequests;
        while (limit > 0) {
            Pages.push(url + (limit));
            limit--;
        }
       wizard();
    }
};

function wizard() {

    if (Pages.length) {
      var url = Pages.shift();
      var scraper = new Scraper(url);

      scraper.on('error', function(error) {
          console.log(error + ' : ' + url);
          wizard();
      });

      scraper.on('complete', function(data) {
          //store the results in database
          //console.log('Complete : ' + url);
        /*   MongoProcess.insert(data, Collection, function(message) {
              console.log(message);
          });
        elastic.insert(data, function(message) {
              console.log(message);
          }); */
          wizard();
      });
    }
};

  readFile();
