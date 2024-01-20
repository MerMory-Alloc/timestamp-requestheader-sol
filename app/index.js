require('dotenv').config()
// init project
var express = require('express');
var app = express();

const isConvertibleToDate = require('./helper.js').isConvertibleToDate
const isMilliseconds = require('./helper.js').isMilliseconds

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami",(req,res) => {
  res.json({"ipaddress":req.ip,
            "language":req.get("accept-language"),
            "software":req.get("user-agent"),
            })
})

app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({ utc: date.toUTCString(), unix: Number(date) });
});

app.get("/api/:date",(req,res) => {
  var date = req.params.date;
  if(!date){
    res.json({error: "No date provided"});
  } else {
    if(isConvertibleToDate(date)){
      res.json({unix: Date.parse(date), utc: new Date(date).toUTCString()});
    } else {
      if(isMilliseconds(date)){
        res.json({unix: Number(date), utc: new Date(Number(date)).toUTCString()});
      } else {
        res.json({error: "Invalid Date"});
      }
    }
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

