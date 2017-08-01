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
var session = require('express-session');
var morgan = require('morgan');

// var pbkdf2 = require('pbkdf2');
// var crypto = require('crypto');
//
// var salt = crypto.randomBytes(20).toString('hex');
// var password= "hello";
// var key = pbkdf2.pbkdf2Sync(
//   password, salt, 36000, 256, 'sha256'
// );
// var hash = key.toString('hex');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

//how do I set up SECRET_KEY?
app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}));

//asks for the user session, if session, goes next()
//req.path
app.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else if (req.path == '/create/') {
    res.redirect('/login');
  } else {
    next();
  }
});


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
/********* LOGIN **********/

app.get('/login', function(req, res) {
  res.render('login.hbs');
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == 'ronda' && password == 'hello') {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.redirect('login.hbs');
  }
});

app.get('/logout', function (req, res) {
  delete req.session;
  res.redirect('/')
})

var PORT = process.env.PORT || 9090;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
