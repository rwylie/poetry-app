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

//big huge thesaurus api
// app.get('/create/', function(req, res) {
//   let secretKey = "efc9deef165ea63a44d6f9205e00faf1";
//   res.render('create.hbs', {key: secretKey});
// });

//wordnik api
app.get('/create/', function(req, res) {
  let secretKey = "bb9ea069b0f1078b1600007e92e096555a5f94077056a0812";
  res.render('create.hbs', {key: secretKey});
});

// app.get('/layout/', function(req, res) {
//   let secretKey = "bb9ea069b0f1078b1600007e92e096555a5f94077056a0812";
//   res.render('layout.hbs', {key: secretKey});
// });


app.get('/about/', function(req, res) {
  res.render('about.hbs');
});

/**********POEMS***********/

app.post('/add_poem/', function (req, res, next) {
  var poem = req.body.createPoem1 + "\n" + req.body.createPoem2 + "\n" + req.body.createPoem3 + "\n" + req.body.createPoem4;
  var user_id = req.body.uid;
  req.session.uid = user_id;
  var title = req.body.title;
  db.none('INSERT INTO Poems VALUES (default, $1, $2, $3)', [poem, user_id, title])
    .then(function() {
      res.redirect('/saved/');
    })
    .catch(next);
});

app.post('/update_poem/', function(req, res, next) {
  var id = req.body.id;
  console.log(id);
  var title = req.body.updateTitle;
  var poem = req.body.line0 + "\n" + req.body.line1 + "\n" + req.body.line2 + "\n" + req.body.line3;
  console.log(title);
  db.none('UPDATE poems SET name = $1, poem = $3 WHERE id = $2', [title, id, poem] )
    .then(function() {
      res.redirect('/saved/');
    })
    .catch(next);
});

app.post('/save_uid/', function(req, res){
  var user_id = req.body.uid;
  req.session.uid = user_id;
  console.log('SAVED UID', req.session.uid);
  res.json({status : "OK"})
});

app.post('/logout', function(req, res){
  delete req.session.uid;
  res.json({status : "OK"})
});

app.get('/mypoems/', function(req,res, next) {
  var id = req.session.uid || null;
  console.log('UID', id);
  if(id === null ) {
    res.redirect('/login/?next=/mypoems/');
  }
  db.any('SELECT * FROM poems WHERE user_id = $1', id)
  // db.any(`SELECT * FROM poems`)
  .then(function(poems) {
    res.render('mypoems.hbs', {'poems': poems});
  })
  .catch(next);
});

app.get('/poem/', function(req, res, next) {
  var id = req.query.poem;
  console.log(id);

  db.one(`SELECT * FROM poems WHERE id = '${id}'`)
  .then(function(p) {
    console.log(p.poem);
    var poemSplit = p.poem.split('\n');
    res.render('poem.hbs', {'poem': poemSplit, 'name': p.name, 'id': id});
  })
  .catch(next);
});

app.post('/delete/', function(req, res, next) {
var id = req.body.id;
console.log(id);
  db.any('DELETE FROM poems WHERE id = $1', id)
  .then(function() {
    res.render('deleted.hbs');
  })
  .catch(next);
});
// app.get('/allpoems/', function (req, res, next) {
//   var id = req.session.uid;
//
//   db.any('SELECT * FROM poems WHERE user_id = $1', id)
//   .then(function(poems) {
//     res.render('allpoems.hbs', {'poems': poems});
//   })
//   .catch(next);
// });

app.get('/saved/', function( req, res, next) {
  res.render('saved.hbs');
});

app.get('/oops/', function(req, res, next) {
  res.render('oops.hbs');
});

app.get('/loggedin/', function(req, res, next) {
  res.render('home.hbs');
});
app.get('/login/', function(req, res, next) {
  res.render('login.hbs');
});



var PORT = process.env.PORT || 9090;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
