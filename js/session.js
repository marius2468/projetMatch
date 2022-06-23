ajaxRequest('GET', '../php/libraries/getSession.php', redirectSession);

function redirectSession(session){
    if (session == null){
        document.location.href = "connection.html";
    }
}