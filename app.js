var express        = require('express');
var bodyParser     = require('body-parser');
var http           = require('http');
var app            = express();
var filter         = require('./controllers/drm-filter');

// Error object to be returned in request JSON data is invalid 
var INVALID_JSON_ERROR_OBJ = {
  "error": "Could not decode request: JSON parsing failed"
}

// Create application/json parser
var jsonParser = bodyParser.json()

app.set( 'port', process.env.PORT || 3001 );

app.use(jsonParser);

// First, check if received JSON is valid, on failure - return error and finish 
app.use(function(err,req,res,next) {
  console.log('Bad request');
  
  if (err) {
    res.status(400).send(JSON.stringify(INVALID_JSON_ERROR_OBJ, null, 2));
  } else {
    // JSON is fine, continue
    next();
  }
});

// Process received input
app.post('/', function (req, res) {
  res.send(JSON.stringify(filter(req.body), null, 2));
});

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});