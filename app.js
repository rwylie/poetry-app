var express = require('express');
var app = express();
var bodyParser = require('body-parser');  //for form data that is submited, you need a different parser for JSON or another, this is just standard form data

var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: Promise
});

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  res.render('home.hbs');
});

app.get('/create/', function(req, res) {
  res.render('create.hbs');
});

var PORT = process.env.PORT || 9090;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
