//create a web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

//parse the request body
app.use(express.json());

//GET /api/comments
app.get('/api/comments', (req, res) => {
  //read the comments.json file
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf-8'));
  //send the comments as a response
  res.json(comments);
});

//POST /api/comments
app.post('/api/comments', (req, res) => {
  //read the comments.json file
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf-8'));
  //add the new comment to the comments array
  comments.push(req.body);
  //write the comments array back to the file
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
  //send the new comment as a response
  res.json(req.body);
});

//start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});