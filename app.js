var MongoProcess = require('./mongoProcess');
var Scraper = require('./scraper');
var Pages = [];
var numberOfRequests = 3;
var collection = 'thairath';

// store all urls in a global variable
Pages = generateUrls(numberOfRequests);

function generateUrls(limit) {
  MongoProcess.select(collection, function(message){
    console.log(message);
  });

  var url = 'http://www.thairath.co.th/content/';
  var urls = [];
  while (limit > 0) {
    urls.push(url + (limit));
    limit--;
  }
  return urls;
}


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
}

wizard();
