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
    search: function() {
        client.search({
            index: 'twitter',
        }).then(function(resp) {
            var hits = resp.hits.hits;
            console.log(hits);
        }, function(err) {
            console.trace(err.message);
        });
    },
    insert: function(data, callback) {
        client.index({
                index: 'index_test',
                type: 'news',
                id: data.PostUrl,
                body: {
                    url: data.PostUrl,
                    datetime: data.PostDate,
                    title: data.Title,
                    content: data.Content
                }
            },
            function(error, response) {
                if (response.created) {
                    return callback("Id :" + data.PostUrl + " create index success")
                } else {
                    return callback("Id :" + data.PostUrl + " is duplicate")
                }
            });
    },
    // closeConnection: funtion() {
    //     client.close();
    // }

};
