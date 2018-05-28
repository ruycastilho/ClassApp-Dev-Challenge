const express = require('express');
const multer = require('multer'); // file storing middleware
const bodyParser = require('body-parser'); //cleans our req.body

const app = express();
const port = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Listening on port ${port}`));

