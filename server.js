//init project
var express = require('express');
var cors = require('cors');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

//Serve static assets(http://expressjs.com/en/starter/static-files.html)
app.use(express.static('public'));

//Serve an html file (http://expressjs.com/en/starter/basic-routing.html)
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  var date_string = req.params.date_string;
  var date;
  var timestamp = {};

  if(date_string === undefined) {
    date = new Date();
    timestamp.unix = date.getTime();
    timestamp.natural = date.toUTCString();
  } else {
    date = !isNaN(date_string) ? new Date(parseInt(date_string)) : new Date(date_string);
    if(!isNaN(date.getTime())){
      timestamp.unix = date.getTime();
      timestamp.natural = date.toUTCString();
    } else {
      timestamp.unix = null;
      timestamp.natural = "Invalid Date";
    }
  }  
  
  res.json(timestamp);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});