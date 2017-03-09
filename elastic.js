var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    hosts: [{
            host: 'localhost',
            port: 9200,
            user: 'elastic',
            password: 'changeme'
        }
        // 'https://[username]:[password]@[server]:[port]/'
    ]
});

module.exports = client;
