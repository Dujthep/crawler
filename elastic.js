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
    create: function() {
        client.index({
                index: 'index_test',
                type: 'news',
                id: '1', // user url for id
                body: {
                    url: 'www.test.com',
                    datetime: '2017-03-23',
                    title: 'ทำสอบหัวข้อ',
                    content: 'ทดสอบตัดคำภาษาไทย โดยใช้ elasticsearch ในการช่วยตัดคำ'
                }
            },
            function(error, response) {
                console.log('es')
                console.log(response);
            });
    },
    closeConnection: funtion() {
        client.close();
    },

};
