
var fs = require('fs');

  module.exports = {
      readUrl : function(filepath,callback) {
        console.log('readfile...');

        var input = fs.createReadStream(filepath);
        readLines(input, function(data){
          return callback(data);
        });
      }
  };

  function readLines(input, callback) {
    var result = [];

    input.on('data', function(data) {
      var remaining = '';
      remaining += data;
      var index = remaining.indexOf('\r\n');
      while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);


        result.push(line);
        index = remaining.indexOf('\r\n');
      }
    });

    input.on('end', function() {
      if (result.length > 0) {
        return callback(result);
      }
    });

    input.on('error', function(error) {
        return callback(404);
    });
  }
