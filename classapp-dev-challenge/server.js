// ClassApp DevChallenge (Server)
// Available at: https://classapp-dev-challenge.herokuapp.com/
// Challenge: https://gist.github.com/lucas-brito/84a77f08115ae4b9b034c010ff2a2ab4
// Author: Ruy Castilho Barrichelo, github.com/ruycastilho

// Parser: Available at 'parser.js'
var Parser = require('./parser.js');
// Filestream : Working with file I/O
var fs = require("fs");
// Express: Server
const express = require('express');
// Multer : File storing
const multer = require('multer');
// Body-Parser : Cleans req.body
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/parser', (req, res) => {
  Parser.parseCSV();
  res.send();


});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));

