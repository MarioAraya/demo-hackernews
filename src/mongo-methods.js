const request = require('request');
const newsUrl = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';


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

// saveToDb()

// getAllNewsFromDb() 

module.exports.scheduleJob = scheduleJob