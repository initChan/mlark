var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up static middleware
app.use(express.static(__dirname +'/public'));

app.set('port', process.env.PORT || 3000);

// routes
app.get('/', function(req, res) {
  res.render('home');
  /*
  res.type('text/plain');
  res.send('Home page here 음음음');
  */
});


var fortunes = [
  "동쪽이 길하다",
  "무지가 자랑이냐",
  "먹고 살기 쉽지 않지?",
  "마우스는 로지텍",
  "스마트 폰은 애플",
]; 


app.get('/about', function(req, res) {
  var randomFortune =
    fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', {fortune: randomFortune});
  /*
  res.type('text/plain');
  res.send('About this page here... 낫띵...');
  */
});

//custom 404 page
app.use(function(req, res) {
  
  res.status(404);
  res.render('404');
  /*
  res.type('text/plain');
  res.send('엄... you know... 404... file not found.');
  console.log('Error 404 from port ' + app.get('port'));
  */
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500')
  /*
  res.type('text/plain');  
  res.send('Sorry. Server error - 500');
  */
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
