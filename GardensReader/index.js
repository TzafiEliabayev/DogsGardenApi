// Works independantly
// Put the gardens "export.xlsx" in the current directory
// and run the index.js file
// ((( cmd: node index.js)))

var gardensCoordinates  = require('./js/gardensCoordinates');
var gardensXlsxReader  = require('./js/gardensXlsxReader');

// var run = function run(callback){
//     var res = gardensXlsxReader.readXlsx("export.xlsx", "output.json");
//     console.log(res);
//     if(res){
//         callback("output.json");
//     }
// }

// run(gardensCoordinates.getGardens);


// var promise = new Promise(function(resolve, reject) {
//     console.log("promise started");
//   // do a thing, possibly async, then…
//   var res = gardensXlsxReader.readXlsx("export.xlsx", "output.json");
//   console.log("after calling xlsx reader");
//   console.log(res);
//   if (res) {
//     resolve("Stuff worked!");
//   }
//   else {
//     reject(Error("It broke"));
//   }
// });

gardensXlsxReader.readXlsx("export.xlsx", "output.json").then(function(result) {
  console.log("We returned from the promise into the RESOLVE");
  console.log(result); // "Stuff worked!"
  gardensCoordinates.getGardens("output.json");
}, function(err) {
  console.log(err); // Error: "It broke"
});