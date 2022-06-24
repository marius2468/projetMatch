// AJAX request sent in all files except connection and register to get the user SESSSION
ajaxRequest('GET', '../php/libraries/getSession.php', redirectSession);

/**
 * redirect the user to connection if there is no SESSION
 * @param session
 */
function redirectSession(session){
    if (session == null){
        document.location.href = "connection.html";
    }
}