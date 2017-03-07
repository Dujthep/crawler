var Crawler = require("node-webcrawler");
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var c = new Crawler();


module.exports = {
    getData: function(page) {
        c.queue(page);
    }
};

c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function(error, result, html) {
        var tmp;
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        if (error) {
            console.log(error);
        } else {
            console.log('crawler');
            tmp = html('section, .mainContent').text();
            // console.log(tmp)
        }
        return tmp;
    }
});
