var MongoClient = require('mongodb').MongoClient,assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

module.exports = {
    insert: function() {
        console.log('insert')
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
