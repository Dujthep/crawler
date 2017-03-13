var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

module.exports = {
    insert: function(document, callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;

          db.collection('thairath').insert(document, function(err, records) {
            if (err) callback('Insert Error');
            return callback('Insert Success');
          });

          db.close();
      });


    },
    delete: function() {
        return 'delete';
    },
    select: function() {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            db.close();
        });
        return 'select';
    }
};
