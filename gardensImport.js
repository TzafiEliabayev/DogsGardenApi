var $ = require('jquery');
var utf8 = require('utf8');
var xmlhttprequest = require('xmlhttprequest');

var getGardens = function getGardens(){
  var jsonFile = require('./output.json');
  var gardensCount = jsonFile.length;
  var gardens = new Array();

  jsonFile.forEach(function(element, index) {
    console.log('[' + ++index + ' of ' + gardensCount + '] ' + element.oid_gina + ': ');
    var fullAddress;
    if(parseInt(element.ms_bait) === 0){
      fullAddress = element.shem_rechov + ' תל-אביב יפו ישראל';
    }
    else{
      fullAddress = element.shem_rechov + ' ' + element.ms_bait + ' תל-אביב יפו ישראל';
    }
    var geocodeAddress = fullAddress.replace(/ /g,"+");
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress + "&key=AIzaSyA8nx1tZbumGf8TLv-6GnM9zYcWSkM5ODM";

    var xhr = new xmlhttprequest.XMLHttpRequest();
    xhr.open('GET', utf8.encode(url), false);
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var currentGarden = new Object();
      currentGarden['shem_rechov'] = element.shem_rechov;
      currentGarden['ms_bait'] = element.ms_bait;
      currentGarden['shem_gina'] = element.shem_gina;
      if(response.results.length === 0){
        return;
      }
      console.log(response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng);
      currentGarden['coordinates'] = {'lat': response.results[0].geometry.location.lat,
                                      'lng': response.results[0].geometry.location.lng}
      gardens.push(currentGarden);
    }
});

return gardens;
}

exports.getGardens = getGardens;