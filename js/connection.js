/**
 * Connection function using GET request to get the SESSION and id from connection.php
 * @param event
 */
function connect(event){
    let email = $('#mailInput').val();
    let password = $('#passwordInput').val();

    ajaxRequest('GET', '../php/libraries/Person/connection.php?email=' + email + '&password=' + password, callback)
}

/**
 * callback function redirecting to the main page
 * @param message
 */
function callback(message){
    console.log(message)
    document.location.href="searchMatch.html";
}