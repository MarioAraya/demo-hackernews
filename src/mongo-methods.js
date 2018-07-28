const axios = require('axios');
const newsUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = 'mongodb://127.0.0.1:27017';

// Once an hour, read from API-News-Endpoint and add new posts to Db
var scheduleJob = function() {
    cron = require('node-schedule');
    cron.scheduleJob('*/9 * * * *', function(){ 
        console.log('News requested from Url')
        axios.get(newsUrl)
            .then(json => {
                console.log('Hits loaded', json.data.hits.length)
                return json.data.hits;
            })
            .then(hits => {
                MongoClient.connect(MongoUrl, function(err, client) {
                    db = client.db('hndatabase');
                    db.collection('hnNews').insert(hits, function (err, result) {
                        if (err) return err
                        console.log('hits inserted OK!')
                        //db.close();
                    });
                });
            })
    })
};

var getAllNewsFromDb = function(callback) {
    MongoClient.connect(MongoUrl, function(err, client) {
        db = client.db('hndatabase');
        db.collection('hnNews').find().toArray((err, items) => {
            if (err) throw err;
            callback(items)
        });
    });
};

module.exports = {
    scheduleJob: scheduleJob,
    getAllNewsFromDb: getAllNewsFromDb
}