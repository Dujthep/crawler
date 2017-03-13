var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    hosts: [{
            host: 'localhost',
            port: 9200,
            // httpAuth : 'elastic:changeme'
        }
        // 'https://[username]:[password]@[server]:[port]/'
    ]
});

// module.exports = client;

module.exports = {
    search : function() {
        client.search({
            index: 'twitter',
        }).then(function(resp) {
            var hits = resp.hits.hits;
            console.log(hits);
        }, function(err) {
            console.trace(err.message);
        });
    }
};
