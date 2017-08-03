var d3         = require('d3-quadtree');

function createCoordinatesList(gardensJson){
    var coordinates = new Array();
    gardensJson.forEach(function(element) {
        var current = [element.coordinates.lat, element.coordinates.lng];
        coordinates.push(current);
    });
    return coordinates;
}

function GardensQuadtree(gardensJson, swPoint, nePoint){
    console.log('sw:  ' + swPoint);
    this.gardensJson = gardensJson;
    this.coordinatesList = createCoordinatesList(gardensJson);
    this.gardensQT = d3.quadtree().extent([swPoint, nePoint]);
    this.gardensQT.addAll(this.coordinatesList);
    console.log('DATA:   ' + this.gardensQT.data());
}

GardensQuadtree.prototype.findNearestGarden = function(basePoint) {
    var nearestPoint = this.gardensQT.find(basePoint.lat, basePoint.long);
    var nearestGarden = this.gardensJson.find(x => x.coordinates.lat === nearestPoint[0] && x.coordinates.lng === nearestPoint[1]);
    return nearestGarden;
};

exports.GardensQuadtree = GardensQuadtree;
// exports.findNearestGarden = GardensQuadtree.prototype.findNearestGarden;