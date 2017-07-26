// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var gardensQT  = require('./gardenQuadtree');
var gardensImport  = require('./gardensImport');
var $               = require('jquery');
var d3         = require('d3-quadtree');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var gardensCoordinates = require('./GardensCoordinates.json');
console.log(gardensCoordinates[0]);



var gardens = [
    {
        "name": "גן סדנת האמנים דרויאנוב",
        "location": "אליפלט 5, תל אביב יפו, ישראל",
        "latitude": "32.0554841",
        "longitude": "34.7649306"
    }]

var test = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "button",
        "text": "להלן 3 הגינות הקרובות ביותר למיקומך",
        "buttons": [
          {
            "type": "web_url",
            "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
            "title": "Button Title1"
          },
          {
            "type": "web_url",
            "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
            "title": "Button Title2"
          },
          {
            "type": "web_url",
            "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
            "title": "Button Title3"
          }
        ]
      }
    }
  }



var width = 600,
    height = 600;

// var data = d3.range(1000).map(function() {
//   return [Math.random() * width, Math.random() * height];
// });
// console.log(data);
var data = [[10,170],[40,80],[50,30],[70,30],[210,180],[200,90],[250,10],[350,160],[370,30],[390,00],[400,50],[490,80],[540,150]];

var quadtree = d3.quadtree()
    .extent([[-1, -1], [width + 1, height + 1]]);
quadtree.addAll(data);

console.log(quadtree.find(382, 28));
console.log(quadtree.data());



// for(gardenIndex in gardensJson){
//     var fullAddress = gardensJson[gardenIndex].shem_rechov + ' ' + gardensJson[gardenIndex].ms_bait + ' תל-אביב יפו ישראל';
//     console.log(fullAddress);
//     var geocodeAddress = fullAddress.replace(/ /g,"+");
//     console.log(geocodeAddress);
//     var myjson;
//     // $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress + "&key=AIzaSyA8nx1tZbumGf8TLv-6GnM9zYcWSkM5ODM", function(json){
//     //     myjson = json;
//     //     console.log(myjson);
//     // });
// }

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
        test.attachment.payload.buttons[0].url = 'https://www.google.com/maps/dir/?api=1&origin=' + req.params.lat + '%2C' + req.params.long
        + '&destination=32.0554841%2C34.7649306&travelmode=walking'
        jsonResponse.push(test);
        res.send(jsonResponse);
        //res.send('{"message": [' + JSON.stringify(test) + ']}');
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);