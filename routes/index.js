var express = require('express');
var router = express.Router();

// TODO: delete mock code, Get from API
const mockNews = require('./mock.json')
const mock2 = [{
  created_at: "2018-07-19T21:45:05.000Z",
  author: "nodesocket",
  story_title: "Google Cloud Downtime Postmortem",
  story_url: "https://status.cloud.google.com/incident/cloud-networking/18012?m=1"
},{
  created_at: "2018-07-17T21:45:05.000Z",
  author: "nobody",
  story_title: "Etc",
  story_url: "https://www.economist.com/science-and-technology/2018/07/21/python-has-brought-computer-programming-to-a-vast-new-audience"
},{
  created_at: "2018-07-12T21:45:05.000Z",
  author: "author3",
  story_title: "Title asdf",
  story_url: "https://tyk.io/blog/rest-never-crud/"
}]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HN News', subtitle: 'We <3 hacker news!', feed: mock2 });
});

/* GET posts mock */
router.get('/json-mock', function(req, res, next) {
  res.json(mockNews)
});

module.exports = router;
