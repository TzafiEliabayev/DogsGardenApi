var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var gardensQT  = require('./js/gardens');
var chatfuel  = require('./js/chatfuel');
var d3         = require('d3-quadtree');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// var coordinates = new Array();
// gardensCoordinates.forEach(function(element) {
//     var current = [element.coordinates.lat, element.coordinates.lng];
//     coordinates.push(current);
//   });
// console.log(coordinates);

// var test = {
//     "attachment": {
//       "type": "template",
//       "payload": {
//         "template_type": "button",
//         "text": "להלן 3 הגינות הקרובות ביותר למיקומך",
//         "buttons": [
//           {
//             "type": "web_url",
//             "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
//             "title": "Button Title1"
//           },
//           {
//             "type": "web_url",
//             "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
//             "title": "Button Title2"
//           },
//           {
//             "type": "web_url",
//             "url": "http://www.calcalist.co.il/home/0,7340,L-8,00.html",
//             "title": "Button Title3"
//           }
//         ]
//       }
//     }
//   }
var gardensJson = require('./GardensCoordinates.json');
var swPoint = [32.022990, 34.738512];
var nePoint = [32.154185, 34.872408];
var gardens = new gardensQT.GardensQuadtree(gardensJson, swPoint, nePoint);
// console.log("Testing search result >>> " + JSON.stringify(gardens.findNearestGarden({
//     'lat': 32.125710,
//     'lng': 34.800915
//   })));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log("router.use");
//     next(); // make sure we go to the next routes and don't stop here
// });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

// more routes for our API will happen here
router.route('/:lat/:long')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        //console.log('req.params >>>>>>>>>>>>>>>>>> ' + JSON.stringify(req.params));
        var nearest = gardens.findNearestGarden(req.params);
        // var nearest = quadtree.find(req.params.lat, req.params.long);
        // console.log(nearest);
        // var garden = gardensCoordinates.find(x => x.coordinates.lat === nearest[0] && x.coordinates.lng === nearest[1]);
        var gardenInfo = [{'coordinates': {
                          'lat': nearest.coordinates.lat,
                          'long': nearest.coordinates.lng},
                        'name': nearest.shem_gina}];
        //console.log(gardens);
        var result = chatfuel.createChatfuelButtonsAnswer(req.params, gardenInfo);
        //console.log(result);
        // test.attachment.payload.buttons[0].url = 'https://www.google.com/maps/dir/?api=1&origin=' + req.params.lat + '%2C' + req.params.long
        // + '&destination=' + nearest[0] + '%2C' + nearest[1] + '&travelmode=walking';
        res.send(result);
        //res.send('{"message": [' + JSON.stringify(test) + ']}');
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);