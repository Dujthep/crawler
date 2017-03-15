var MongoProcess = require('./MongoProcess');
var Scraper = require('./scraper');
var Pages = [];
var numberOfRequests = 5;

// store all urls in a global variable
Pages = generateUrls(numberOfRequests);

function generateUrls(limit) {
  var url = 'http://www.thairath.co.th/content/';
  var urls = [];
  var i;
  for (i=0; i < limit; i++) {
    urls.push(url + (i+1));
  }
  return urls;
}


function wizard() {
  // if the Pages array is empty, we are Done!!
  if (!Pages.length) {
    return console.log('Done!!!!');
  }
  var url = Pages.pop();
  var scraper = new Scraper(url);
  // next request on error
  scraper.on('error', function (error) {
    console.log(error);
    wizard();
  });
  // if the request completed successfully
  scraper.on('complete', function (data) {
    //store the results in database
    var collection = 'thairath';
    var mongoProcess = new MongoProcess(data,collection);
    mongoProcess.on('message', function (message) {
      console.log(message);
    });
    wizard();
  });
}

wizard();
