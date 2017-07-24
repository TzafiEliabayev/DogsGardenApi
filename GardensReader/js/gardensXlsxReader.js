var xlsxj = require('xlsx-to-json');

function readXlsx(xlsxFileName, outputFileName){
    console.log("Started readXlsx");
    var res;
    xlsxj(
      {input: xlsxFileName, output: outputFileName},
      function(err, result) {
        if(err) {
            console.log("ERROR !!!!!");
            console.error("ERROR!! " + err);
            res = false;
            console.log("err .... " + res);
        }
        else {
            console.log("Finished reading xlsx to output JSON! GREAT!");
            res = true;
            console.log("good .... " + res);
        }
      }
    );
    console.log("res is .... " + res);
    return res;
}

exports.readXlsx = readXlsx;

// xlsxj(
//   {input: "export.xlsx", output: "output.json"},
//   function(err, result) {
//     if(err) {
//     console.error(err);
//     }
//     else {
//     console.log("Finished xlsx GREAT!");
//     }
//   }
// );