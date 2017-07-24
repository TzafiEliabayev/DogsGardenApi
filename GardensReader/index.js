// Works independantly
// Put the gardens "export.xlsx" in the current directory
// and run the index.js file
// ((( cmd: node index.js)))

var gardensCoordinates  = require('./js/gardensCoordinates');
var gardensXlsxReader  = require('./js/gardensXlsxReader');

var res = gardensXlsxReader.readXlsx("export.xlsx", "output.json");
console.log(res);
if(res){
    gardensCoordinates.getGardens("output.json");
}