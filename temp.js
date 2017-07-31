var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var gardensQT  = require('./js/gardenQuadtree');
var chatfuel  = require('./js/chatfuel');
var d3         = require('d3-quadtree');
var gardensCoordinates = require('./GardensCoordinates.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var coordinates = new Array();
gardensCoordinates.forEach(function(element) {
    var current = [element.coordinates.lat, element.coordinates.lng];
    coordinates.push(current);
  });
console.log(coordinates);

var quadtree = d3.quadtree()
    .extent([[32.022990, 34.738512], [32.154185, 34.872408]]);
quadtree.addAll(coordinates);

console.log("Testing search result >>> " + quadtree.find(32.125710, 34.800915));
var nearest = quadtree.find(32.125710, 34.800915);
var garden = gardensCoordinates.find(x => x.coordinates.lat === nearest[0] && x.coordinates.lng === nearest[1]);
console.log('garden is: ' + garden);
        var gardens = [{'coordinates': {
                          'lat': garden.coordinates.lat,
                          'long': garden.coordinates.lng},
                        'name': garden.shem_gina}];
        console.log(gardens);
        var result = chatfuel.createChatfuelButtonsAnswer({'lat': '32.125710',
                          'long': '34.800915'}, gardens);
        console.log(JSON.stringify(result));
        console.log(result);
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log("router.use");
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
        return result;
        var nearest = quadtree.find(req.params.lat, req.params.long);
        console.log(nearest);
        var garden = gardensCoordinates.find(x => x.coordinates.lat === nearest[0] && x.coordinates.lng === nearest[1]);
        var gardens = [{'coordinates': {
                          'lat': garden.coordinates.lat,
                          'long': garden.coordinates.lng},
                        'name': garden.shem_gina}];
        console.log(gardens);
        var result = chatfuel.createChatfuelButtonsAnswer(req.params, gardens);
        console.log(result);
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

//
//
//
//

function pathUrl(starting, desination){
    var url = 'https://www.google.com/maps/dir/?api=1&origin=' + starting.lat + '%2C' + starting.long + '&destination=' +
    desination.lat + '%2C' + desination.long + '&travelmode=walking';
    return url;
}

function pathButton(url, title){
    var button = {
        "type": "web_url",
        "url": url,
        "title": title
    }
    return button;
}

function createPathButton(starting, desination, title){
    var url = pathUrl(starting, desination);
    var button = pathButton(url, title);
    return button;
}

function getChatfuelEmptyAnswer(){
    var result = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "",
                "buttons": []
            }
        }
    }
    return result;
}

function createChatfuelButtonsAnswer(startingPoint, gardensArray){
    var jsonResponse = [];
    var result = getChatfuelEmptyAnswer();
    var buttons = new Array();
    //Handle list of gardens
    if(Array.isArray(gardensArray)){
        gardensArray.forEach(function(element) {
            buttons.push(createPathButton(startingPoint, element.coordinates, element.name));
        });
    }
    result.attachment.payload.text = 'test';
    result.attachment.payload.buttons = buttons;
    jsonResponse.push(result);
    return jsonResponse;
}

exports.createChatfuelButtonsAnswer = createChatfuelButtonsAnswer;