const axios = require('axios');
const newsUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = 'mongodb://127.0.0.1:27017';

// Once an hour, read from API-News-Endpoint and add new posts to Db
var scheduleJob = function() {
    cron = require('node-schedule');
    cron.scheduleJob('0 */1 * * *', function(){ 
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
                    });
                });
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
            });
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