var MongoProcess = require('./MongoProcess');
var Scraper = require('./Scraper');
var ReadFiles = require('./ReadFiles');
var elastic = require('./elastic');

var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 3;
var Collection = 'thairath';
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
        var pageName = url.split('/');
        Collection = pageName[2];

        MongoProcess.select(Collection, function(url) {
            //console.log(url);
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
          console.log('Complete : ' + url);
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
