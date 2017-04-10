var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var url = 'mongodb://localhost:27017/scraper';
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = {
    insert : function(data, collection, callback) {
      this.collection = collection;
      this.document = data;
      var v_this = this;

      MongoClient.connect(url, function(err, db) {
        if (err) return callback('Connect Error : ' + v_this.document.PostUrl);

       db.collection(v_this.collection).insert(v_this.document, function(err, records) {
          if (err) return callback('Insert Error : ' + v_this.document.PostUrl);
          return callback('Insert Success : ' + v_this.document.PostUrl);
        });

        db.close();
      });
    },
    update : function(){
      MongoClient.connect(url, function(err, db) {
        if (err) return callback('Connect Error');


        db.close();
      });
    },
    delete: function() {
        return 'delete';
    },
    select: function(collection,callback) {
        this.collection = collection;
        var v_this = this;

        MongoClient.connect(url, function(err, db) {
          if (err) return callback('Connect Error');
          
          var query = {'PostUrl' : 1, '_id' : 0};
          var options = {"sort" : ['Seq', 'asc']};
          db.collection(v_this.collection).find({}, query, options).toArray(function(err, docs){
            return callback(docs);
          });

          db.close();
        });
        return 'select';
    }
};
