
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
      var res = data.toString().split("\r\n");

      while (res.length > 0) {
        var r = res.shift();
          if(r != ''){
            result.push(r);
          }
      }
    });

    input.on('end', function() {
      if (result.length > 0) {
        callback(result);
      }
    });

    input.on('error', function(error) {
        return callback(404);
    });
  }
