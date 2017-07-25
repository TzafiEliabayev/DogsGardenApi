var xlsxj = require('xlsx-to-json');

// function readXlsx(xlsxFileName, outputFileName){
//     console.log("Started readXlsx");
//     var res;
//     xlsxj(
//       {input: xlsxFileName, output: outputFileName},
//       function(err, result) {
//         if(err) {
//             console.log("ERROR !!!!!");
//             console.error("ERROR!! " + err);
//             res = false;
//             console.log("err .... " + res);
//         }
//         else {
//             console.log("Finished reading xlsx to output JSON! GREAT!");
//             res = true;
//             console.log("good .... " + res);
//         }
//       }
//     );
//     console.log("res is .... " + res);
//     return res;
// }
function readXlsx(xlsxFileName, outputFileName) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

function readXlsx(xlsxFileName, outputFileName) { return new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  console.log("Started readXlsx");
    var res;
    xlsxj(
      {input: xlsxFileName, output: outputFileName},
      function(err, result) {
        if(err) {
            console.log("ERROR !!!!!");
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