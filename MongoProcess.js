var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var url = 'mongodb://localhost:27017/scraper';
var EventEmitter = require('events').EventEmitter;
var util = require('util');


function MongoProcess (data,collection) {
    this.collection = collection;
    this.document = data;
    this.insert();
}

util.inherits(MongoProcess, EventEmitter);

MongoProcess.prototype.insert = function() {
  var v_this = this;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

      db.collection(v_this.collection).insert(v_this.document, function(err, records) {
        if (err) return v_this.emit('message', 'Insert Error : ' + v_this.document.PostUrl);
        return v_this.emit('message', 'Insert Success : ' + v_this.document.PostUrl);
      });

      db.close();
  });
};

module.exports = MongoProcess;

//module.exports = mongoose.model('Listings', ListingsSchema);
