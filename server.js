var express = require('express'),
    exphbs  = require('express-handlebars'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),
    server = http.Server(app),
    secrets = {
      password: process.env.PASSWORD,
      message: process.env.SECRET_MESSAGE,
      image_url: process.env.SECRET_IMAGE_URL,
      link: process.env.SECRET_LINK
    };

function get_monkey(){
  var monkeys = [
    '🙈',
    '🙉',
    '🙊' 
  ];
  return monkeys[Math.floor(Math.random()*monkeys.length)];
}


function no_entry(){
  var nope = [
    '🚫',
    '😶',
    '🙅',
    '⛔'
  ];
  return nope[Math.floor(Math.random()*nope.length)];
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
    res.render('home', {
      emoji: get_monkey()
    });
});

app.get('/no', function (req, res) {
    res.render('no', {
      emoji: no_entry()      
    });
});

app.get('/secret', function (req, res) {
    res.redirect('/no');
});


app.post('/secret', function(req, res) {
  if (req.body.password && req.body.password === secrets.password) {
    res.render('secret', {
      emoji: '🐵',
      secrets: secrets 
    });    
  } else {
    res.redirect('/no');
  }
});


app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3011);
app.set('ip', '127.0.0.1');


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is running on port ' + listener.address().port);
});
