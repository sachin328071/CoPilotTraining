// create a web server that listens on port 3000
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
      return;
    }
    var comments = JSON.parse(data);

    var newComment = {
      id: Date.now(),
      text: req.body.text,
      author: req.body.author
    };

    comments.push(newComment);

    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred');
        return;
      }
      res.status(201).send('Comment added');
    });
  });
});

app.listen(3000, function() {
    
  console.log('Server is listening on port 3000');
});