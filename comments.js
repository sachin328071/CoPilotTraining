// Create web server
var express = require('express');
var app = express();

// Set port
app.set('port', process.env.PORT || 3000);

// Set views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Set static files
app.use(express.static(__dirname + '/public'));

// Set routes
app.get('/', function(req, res) {
  res.render('index', {title: 'Comments'});
});

// Listen
app.listen(app.get('port'), function() {
  console.log('Server started on http://localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});