'use strict';

function ajaxRequest(type, url, callback, data = null) {
    let xhr;

    // Create XML HTTP request.
    xhr = new XMLHttpRequest();
    if (type == 'GET' && data != null)
        url += '?' + data;
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Add the onload function.
    xhr.onload = () =>
    {
        switch (xhr.status)
        {
            case 200:
            case 201:
                console.log(xhr.responseText);
                callback(JSON.parse(xhr.responseText));
                break;
            default:
                httpErrors(xhr.status);
        }
    };

    // Send XML HTTP request.
    xhr.send(data);
}

function httpErrors(errorCode) {
    let messages =
        {
            400: 'Requête incorrecte',
            401: 'Authentifiez vous',
            403: 'Accès refusé',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            503: 'Service indisponible'
        };

    // Display error.
    if (errorCode in messages)
    {
        $('#errors').html('<i class="fa fa-exclamation-circle"></i> <strong>' +
            messages[errorCode] + '</strong>');
        $('#errors').show();
    }
}

function starFill(id_star){
    var filledStar = "<img src=\"../img/filledStar.svg\" alt=\"logo\">";
    var star = "<img src=\"../img/star.svg\" alt=\"logo\">";

    for (let i = 1; i <= 5; i++) {
        if (i <= (id_star.slice(id_star.length - 1))){
            var id = "star" + i;
            document.getElementById(id).innerHTML = filledStar;
        } else {
            var id = "star" + i;
            document.getElementById(id).innerHTML = star;
        }
    }
}

function getStarRate(id_star){

    var id = id_star;
    var rate = id.slice(id.length - 1);
    console.log(rate);
}

function validateProfil(){

}