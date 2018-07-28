var express = require('express');
var router = express.Router();
var mongoMethods = require('../src/mongo-methods')

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoMethods.getAllNewsFromDb(function(result) {
    console.log('getAllNewsFromDb OK !!!');
    res.render('index', { title: 'HN News', subtitle: 'We <3 hacker news!', feed: result });
  }
)});

/* GET just data */
router.get('/dataonly', function(req, res, next) {
  mongoMethods.getAllNewsFromDb(function(result) {
    res.send(result)    
  }
)});

module.exports = router;
