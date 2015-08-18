var express        = require( 'express' );
var bodyParser     = require("body-parser");
var http           = require( 'http' );
var app            = express();

app.set( 'port', process.env.PORT || 3001 );

// Parse application/json
app.use(bodyParser.json())

app.post('/', function (req, res) {
  console.log(req.body);
  res.send(JSON.stringify(req.body, null, 2));
});

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});