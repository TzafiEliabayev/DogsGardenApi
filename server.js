var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var gardensQT  = require('./js/gardens');
var chatfuel  = require('./js/chatfuel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

// load gardens
var gardensJson = require('./GardensCoordinates.json');
// the outer south-west and north-east points of the map
var swPoint = [32.022990, 34.738512];
var nePoint = [32.154185, 34.872408];
// create the quadtree
var gardens = new gardensQT.GardensQuadtree(gardensJson, swPoint, nePoint);

router.route('/:lat/:long')
    .get(function(req, res) {
        var nearest = gardens.findNearestGarden(req.params);
        var gardenInfo = [{'coordinates': {
                          'lat': nearest.coordinates.lat,
                          'long': nearest.coordinates.lng},
                          'name': nearest.shem_gina}];
        var result = chatfuel.createChatfuelButtonsAnswer(req.params, gardenInfo);
        res.send(result);
    });

// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);