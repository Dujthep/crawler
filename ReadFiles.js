
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
    var remaining = '';
    input.on('data', function(data) {
      remaining += data;
      var index = remaining.indexOf('\r\n');
      while (index > 0) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        index = remaining.indexOf('\r\n');

        result.push(line);
      }
    });

    input.on('end', function() {
      if (result.length > 0) {
        return callback(result);
      }
    });
  }
