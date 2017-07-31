var express = require('express');
var app = express();
var bodyParser = require('body-parser');  //for form data that is submited, you need a different parser for JSON or another, this is just standard form data
var apicache = require('apicache');
var cache = apicache.middleware;
var axios = require('axios');
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: Promise
});

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

//changed api to frontend
// app.get('/api', cache('5 minutes'), function (req, res, next) {
//   console.log('Generating new response');
//   axios.get(`http://words.bighugelabs.com/api/2/efc9deef165ea63a44d6f9205e00faf1/${req.query.word}/json`)
//   .then(function (r) {
//       res.json(r.data);
//       console.log(r.data);
//   })
//   .catch(next);
// });


app.get('/', function(req, res) {
  res.render('home.hbs', {});
});

app.get('/tutorial/', function(req, res) {
  res.render('tutorial.hbs');
});

app.get('/create/', function(req, res) {
  let secretKey = "efc9deef165ea63a44d6f9205e00faf1";
  res.render('create.hbs', {key: secretKey});
});

app.get('/about/', function(req, res) {
  res.render('about.hbs');
});

app.get('/login/', function(req, res) {
  res.render('login.hbs');
});

var PORT = process.env.PORT || 9090;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
