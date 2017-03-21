var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;
var ConvertDate = require('./ConvertDate');
/*
 * Scraper Constructor
**/
function Scraper (url) {
    this.url = url;
    this.init();
}
/*
 * Make it an EventEmitter
**/
util.inherits(Scraper, EventEmitter);

/*
 * Initialize scraping
**/
Scraper.prototype.init = function () {
    var model;
    var self = this;
    self.on('loaded', function (html) {
        model = self.parsePage(html);
        self.emit('complete', model);
    });
    self.loadWebPage();
};

Scraper.prototype.loadWebPage = function () {
  var self = this;
  http.get(self.url, function (res) {
    var body = '';

    if(res.statusCode !== 200) {
      return self.emit('error', STATUS_CODES[res.statusCode]);
    }
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      self.emit('loaded', body);
    });
  }).on('error', function (err) {
    self.emit('error', err);
  });
};
/*
 * Parse html and return an object
**/
Scraper.prototype.parsePage = function (html) {
  var $ = cheerio.load(html);

  var date;
  var title;
  var content;
  var img = [];
  var page_num;
  var post_url;

  ConvertDate.convertMonthNameToNumTH($('time').text().trim(), 'shotmonth', function(data){
    date = new Date(data);
  });
  title = $('section[id=headerContent] h1').text().trim();
  content = $('section[id=mainContent]').text().trim();

  $('section[id=mainContent] img').each(function(i, element){
    var src = $(element).attr("src");
    img.push(src);
  });

  post_url = this.url;
  page_num = parseInt(post_url.substring(post_url.lastIndexOf("/") + 1, post_url.length),10);

  var model = {
        'Seq'      : page_num,
        'PostUrl'  : post_url,
        'PostDate' : date,
        'Title'    : title,
        'Content'  : content,
        'Image'    : img

  };

  return model;
};
module.exports = Scraper;
