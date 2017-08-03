var express = require('express');
var app = express();
var bodyParser = require('body-parser');  //for form data that is submited, you need a different parser for JSON or another, this is just standard form data
var apicache = require('apicache');
var cache = apicache.middleware;
var axios = require('axios');
var promise = require('bluebird');
var session = require('express-session');
var pgp = require('pg-promise')({
  promiseLib: Promise
});

var db = pgp(process.env.DATABASE_URL || {
  host: "localhost",
  port: 5432,
  database: 'poetic',
  user: 'postgres'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 900000}
}));

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

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

/**********POEMS***********/

app.post('/add_poem', function (req, res, next) {
  var poem = req.body.createPoem1 + "\n" + req.body.createPoem2 + "\n" + req.body.createPoem3 + "\n" + req.body.createPoem4;
  var user_id = req.body.uid;
  req.session.uid = user_id;
  db.none(`INSERT INTO Poems VALUES (default, '${poem}', '${user_id}')`)
    .then(function() {
      res.redirect('/saved');
    })
    .catch(next);
});

app.post('/save_uid', function(req, res){
  var user_id = req.body.uid;
  req.session.uid = user_id;
  console.log('SAVED UID', req.session.uid);
  res.json({status : "OK"})
});

app.get('/mypoems', function(req,res, next) {
  var id = req.session.uid;
  console.log('UID', id);

  db.any(`SELECT * FROM poems WHERE user_id = '${id}'`)
  // db.any(`SELECT * FROM poems`)
  .then(function(poems) {
    res.render('mypoems.hbs', {'poems': poems});
  })
  .catch(next);
});

app.get('/poem', function(req, res, next) {
  var id = req.query.poem;
  console.log(id);

  db.one(`SELECT * FROM poems WHERE id = '${id}'`)
  .then(function(p) {
    console.log(p);
  res.render('poem.hbs', {'p': p});
  })
  .catch(next);
});

app.get('/saved', function( req, res, next) {
  res.render('saved.hbs');
});


var PORT = process.env.PORT || 9090;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
