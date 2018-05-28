// ClassApp DevChallenge (Server)
// Available at: https://classapp-dev-challenge.herokuapp.com/
// Challenge: https://gist.github.com/lucas-brito/84a77f08115ae4b9b034c010ff2a2ab4
// Author: Ruy Castilho Barrichelo, github.com/ruycastilho

// Modules Used:

// Parser: Available at 'parser.js'
var Parser = require('./parser/parser.js');
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
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `input.csv`);
  },
});

app.use(express.static(path.join(__dirname, 'client/build')));

var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  Parser.parseCSV();

})

app.get('/download', function(req, res){
  res.download('./files/output.json');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


app.listen(port, () => console.log(`Listening on port ${port}`));

