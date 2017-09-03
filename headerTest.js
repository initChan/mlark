var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// set up static middleware
// app.use(express.static(__dirname +'/public'));

app.set('port', process.env.PORT || 3000);

app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
    console.log('Responded the header information back to your browser.');
});


app.get('/', function (req, res) {
    res.render('home');
    console.log('The connection is from ' + req.ip + ' and host name is ' + req.hostname);
  });

  app.listen(app.get('port'), function (){
    console.log ('Running Express on http://localhost:' +
      app.get ('port') + '; press Ctrl-C to terminate.');
  });
  