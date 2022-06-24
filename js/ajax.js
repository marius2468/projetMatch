'use strict';

/**
 * AJAX request creation function using API REST architecture
 * @param type
 * @param url
 * @param callback
 * @param data
 */
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
                callback(JSON.parse(xhr.responseText));
                break;
            default:
                httpErrors(xhr.status);
        }
    };

    // Send XML HTTP request.
    xhr.send(data);
}

/**
 * Errors dealing function
 * @param errorCode
 */
function httpErrors(errorCode) {
    let messages =
        {
            400: 'Requête incorrecte',
            401: 'Authentifiez vous',
            403: 'Accès refusé',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            503: 'Pas de résultat'
        };

    // Display error.
    if (errorCode in messages) {
        let errors  = $('#errors');
        errors.html('<i class="fa fa-exclamation-circle"></i> <strong>' +
            messages[errorCode] + '</strong>');
        errors.show();
    }
}