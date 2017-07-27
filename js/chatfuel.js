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
    var pathUrl = pathUrl(starting, desination);
    var button = pathButton(pathUrl, title);
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

function createChatfuelButtonsAnswer(startingPoint, gardens){
    var result = getChatfuelEmptyAnswer();
    //Handle list of gardens
    if(Array.isArray(gardens)){
        gardens.forEach(function(element) {

        });
    }
    else{

    }
}




exports.createPathButton = createPathButton;