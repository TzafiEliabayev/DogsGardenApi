function pathUrl(starting, desination){
    var url = 'https://www.google.com/maps/dir/?api=1&origin=' + starting.lat + '%2C' + starting.long + '&destination=' +
    desination.lat + '%2C' + desination.long + '&travelmode=walking';
    return url;
}

function pathButton(url, title){
    var button = {
        "type": "web_url",
        "url": url,
        // "title": title
        "title": 'לחץ כאן לניווט'
    }
    return button;
}

function createPathButton(starting, desination, title){
    var url = pathUrl(starting, desination);
    var button = pathButton(url, title);
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

function createChatfuelButtonsAnswer(startingPoint, gardensArray){
    var jsonResponse = [];
    var result = getChatfuelEmptyAnswer();
    result.attachment.payload.buttons.push(createPathButton(startingPoint, gardensArray[0].coordinates, gardensArray[0].name));
    if(gardensArray[0].street.length > 0 && gardensArray[0].streetNum != 0){
        result.attachment.payload.text = 'הגינה הקרובה ביותר היא גינת ' + gardensArray[0].name + ' בכתובת ' + gardensArray[0].street + ' ' + gardensArray[0].streetNum;
    }
    else{
        result.attachment.payload.text = 'הגינה הקרובה ביותר היא גינת ' + gardensArray[0].name;
    }
    // var buttons = new Array();
    // // Handle list of gardens
    // if(Array.isArray(gardensArray)){
    //     gardensArray.forEach(function(element) {
    //         buttons.push(createPathButton(startingPoint, element.coordinates, element.name));
    //     });
    // }
    // result.attachment.payload.buttons = buttons;
    jsonResponse.push(result);
    return jsonResponse;
}

exports.createChatfuelButtonsAnswer = createChatfuelButtonsAnswer;