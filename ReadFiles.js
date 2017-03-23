
var fs = require('fs');

  module.exports = {
      readUrl : function(callback) {
        console.log('readfile...');
        fs.readFile('UrlPath.txt', 'utf8', function(err, data) {
          if (err) throw err;
           var array = data.toString().split('\r\n');
           return callback(array);
        });
      }
  };
