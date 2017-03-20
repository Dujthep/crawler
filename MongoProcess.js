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
          db.collection(v_this.collection).find().sort({"PostUrl": '1' }, function(err, cursor){
            console.log(cursor);
          });

          db.close();
        });
        return 'select';
    }
};
