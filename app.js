
var ThairatController = require('./Controller/ThairatController');
var ReadFiles = require('./ReadFiles');
var elastic = require('./Elastic');

var MasterUrlPath = [];
var Pages = [];
var numberOfRequests = 5;
var Collection = null;
var filepath = 'MasterUrl.txt';

/*
 * Read the Master url
**/
function readFile() {
    return new Promise(function(resolve, reject) {
        ReadFiles.readUrl(filepath, function(data) {
            resolve(data);
        });
    }).then(function(result) {
        generateUrls(result);
    });
}

/*
 * Store all urls in a global variable
**/
function generateUrls(MasterUrlPath) {
    while (MasterUrlPath.length) {
      
        var url = MasterUrlPath.shift();
        Collection = url.substring(11, url.lastIndexOf('.co.th'));

        switch(Collection) {
          case 'thairath':
              new ThairatController(url, numberOfRequests, Collection);
              break;
          default:
              console.log('url not found');
        }
    /*    MongoProcess.select(Collection, function(err,docs) {
          if (err) console.log(err);
          console.log(docs);
        }); */
    }
};

  readFile();
