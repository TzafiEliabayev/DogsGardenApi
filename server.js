// BASE SETUP
// =============================================================================
var gardens = [
    {
        "name": "גן סדנת האמנים דרויאנוב",
        "location": "אליפלט 5, תל אביב יפו, ישראל",
        "latitude": "32.0554841",
        "longitude": "34.7649306"
    }]

var test = [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Hello!",
          "buttons": [
            {
              "type": "show_block",
              "block_name": "some block name",
              "title": "Show the block!"
            },
            {
              "type": "web_url",
              "url": "https://petersapparel.parseapp.com/buy_item?item_id=100",
              "title": "Buy Item"
            }
          ]
        }
      }
    }
  ]

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
        jsonResponse.push({ "messages": test});
        res.send(jsonResponse);
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);