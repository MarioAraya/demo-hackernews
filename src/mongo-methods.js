const request = require('request');
const newsUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const MongoClient = require('mongodb').MongoClient;
const MongoUrl = 'mongodb://127.0.0.1:27017';
// Database Name
const dbName = 'hnNews';

// Once an hour, read from API-News-Endpoint and add new posts to Db
var scheduleJob = function() {
    var cron = require('node-schedule');
    cron.scheduleJob('*/1 * * * *', function(){ 
        console.log('job executed!')
        let jsonNews = getNewsFromUrl();
    })
};

// Request news URL
var getNewsFromUrl = function() {
    console.log('getNewsFromUrl reached!')
    request(newsUrl, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        return JSON.parse(body).hits;
    });
};

var saveToDb = function() {
    // Connect using MongoClient
    MongoClient.connect(MongoUrl, function(err, client) {
        // Use the admin database for the operation
        const adminDb = client.db(dbName).admin();

        // List all the available databases
        // adminDb.listDatabases(function(err, dbs) {
        //     test.equal(null, err);
        //     test.ok(dbs.databases.length > 0);
        //     client.close();
        // });
    });
}

// getAllNewsFromDb() 

module.exports.scheduleJob = scheduleJob