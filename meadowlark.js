var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up static middleware
app.use(express.static(__dirname +'/public'));

app.set('port', process.env.PORT || 3000);

// check if the URL parameter for testing is set to 1
app.use(function (req, res, next) {
  console.log('req.query.test:' + req.query.test);
  console.log('env: '+ app.get('env')+'\n');
  res.locals.showTests = app.get('env') !== 'prodution' && req.query.test === '1';
  next();
});

// routes
app.get('/', function (req, res) {
  res.render('home');
  /*
  res.type('text/plain');
  res.send('Home page here 음음음');
  */
});

app.get('/about', function (req, res) {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
  console.log('Rendering completed in about');
  /*
  res.type('text/plain');
  res.send('About this page here... 낫띵...');
  */
});

app.get('/headers', function (req, res) {
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
  res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function (req, res) {
  res.status(404);
  res.render('404');
  /*
  res.type('text/plain');
  res.send('엄... you know... 404... file not found.');
  console.log('Error 404 from port ' + app.get('port'));
  */
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500')
  /*
  res.type('text/plain');  
  res.send('Sorry. Server error - 500');
  */
})

app.listen(app.get('port'), function (){
  console.log ('Express started on http://localhost:' +
    app.get ('port') + '; press Ctrl-C to terminate.');
});
