function connect(event){
    let email = $('#mailInput').val();
    let password = $('#passwordInput').val();

    ajaxRequest('GET', '../php/libraries/Person/connection.php?email=' + email + '&password=' + password, callback)
}

function callback(message){
    console.log(message)
    document.location.href="searchMatch.html";
}