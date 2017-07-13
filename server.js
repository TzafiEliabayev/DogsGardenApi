// BASE SETUP
// =============================================================================
var gardens = [
    {
        "name": "גן סדנת האמנים דרויאנוב",
        "location": "אליפלט 5, תל אביב יפו, ישראל",
        "latitude": "32.0554841",
        "longitude": "34.7649306"
    }]

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(gardens);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/:lat/:long')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var jsonResponse = [];
        jsonResponse.push({ "text": "https://www.google.co.il/maps/dir/32.0551441,34.7726752/32.0592177,34.7740485/@32.057208,34.7718061,17z/data=!3m1!4b1!4m2!4m1!3e2?hl=en"});
        res.send(jsonResponse);
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);