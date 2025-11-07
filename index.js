//Grab modules
var express = require('express');
var app = express();
var moment = require("moment");

//Set port
var port = process.env.PORT || 8080;

//Middleware
app.use(express.static('public'));

//Routes
app.get('/:datestring', function (req, res) {

  //If user includes unix timestamp at the end of url
  if (moment.unix(Number(req.params.datestring)).isValid()) {

    //Display Unix and convert to Natural date 
    var object = {
      'unix': Number(req.params.datestring),
      'natural': moment.unix(Number(req.params.datestring)).format('MMMM Do YYYY')
    }
  }

  //If user includes natural language date at the end of url 
  else if (((moment(decodeURIComponent(req.params.datestring)).format('X')) !== "Invalid date") === true) {

    //Display Natural Language date and convert to unix  
    var object = {
      'unix': Number(moment(decodeURIComponent(req.params.datestring)).format('X')),
      'natural': decodeURIComponent(req.params.datestring)
    }
  }

  //If user put invalid date return empty object 
  else {
    var object = {
      "unix": null,
      'natural': null
    }
  }

  //Send response 
  res.send(JSON.stringify(object));
});

//Listen on port 
app.listen(port); 