var d3 = require('d3-quadtree');

function createCoordinatesList(gardensJson){
    var coordinates = new Array();
    gardensJson.forEach(function(element) {
        var current = [element.coordinates.lat, element.coordinates.lng];
        coordinates.push(current);
    });
    return coordinates;
}

function GardensQuadtree(gardensJson, swPoint, nePoint){
    this.swPoint = {
        'lat': swPoint[0],
        'long': swPoint[1]
    };
    this.nePoint = {
        'lat': nePoint[0],
        'long': nePoint[1]
    };
    this.gardensJson = gardensJson;
    this.coordinatesList = createCoordinatesList(gardensJson);
    this.gardensQT = d3.quadtree().extent([swPoint, nePoint]);
    this.gardensQT.addAll(this.coordinatesList);
}

GardensQuadtree.prototype.findNearestGarden = function(basePoint) {
    var nearestPoint = this.gardensQT.find(basePoint.lat, basePoint.long);
    var nearestGarden = this.gardensJson.find(x => x.coordinates.lat === nearestPoint[0] && x.coordinates.lng === nearestPoint[1]);
    return nearestGarden;
};

GardensQuadtree.prototype.isPointInRegion = function(point){
    var isInside =  point.lat >= this.swPoint.lat && point.lat <= this.nePoint.lat &&
                    point.long >= this.swPoint.long && point.long <= this.nePoint.long;
    return isInside;
}

exports.GardensQuadtree = GardensQuadtree;
