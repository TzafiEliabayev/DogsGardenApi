var xlsxj = require('xlsx-to-json');

function readXlsx(xlsxFileName, outputFileName) { return new Promise(function(resolve, reject) {
  console.log("Started readXlsx");
    var res;
    xlsxj(
      {input: xlsxFileName, output: outputFileName},
      function(err, result) {
        if(err) {
            console.error("ERROR!! " + err);
            reject(Error("It broke"));
        }
        else {
            console.log("Finished reading xlsx to output JSON! GREAT!");
            resolve("Stuff worked!");
        }
      }
    );
})};

exports.readXlsx = readXlsx;