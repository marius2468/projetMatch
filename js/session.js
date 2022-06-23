ajaxRequest('GET', '../php/libraries/getSession.php', redirectSession);

function redirectSession(session){
    console.log(session);
    if (isNaN(session)){
        document.location.href = "connection.html";
    }
}