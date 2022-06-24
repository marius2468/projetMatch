// AJAX request to get all the user's notifications
ajaxRequest('GET', '../php/libraries/Notification/getNotification.php', displayNotifs);

/**
 * callback function displaying the notifications
 * @param notifs
 */
function displayNotifs(notifs){
    console.log(notifs);

    for (let notif of notifs){
        let date_time = notif.date_time.split(' ');

        // displaying in html the notification
        $('#notifs').append(
            '<div class="col-lg-4 col-md-6 col-xs-12 col-12 rounded bg-clearGrey m-3 h-200 d-flex justify-content-around">\n' +
            '   <div class="row">\n' +
            '       <div class="col-3 m-auto py-2">\n' +
            '           <img src="' + notif.path + '" alt="logo" height="50">\n' +
            '       </div>\n' +
            '       <div class="col-9 m-auto py-2">\n' +
            '           <h5 class="card-title">' + notif.first_name + ' ' + notif.name + '</h5>\n' +
            '       </div>\n' +
            '       <div class="col-12 d-flex justify-content-center m-auto text-darkGrey py-2">\n' +
            '           ' + date_time[0] + ' à ' + date_time[1] + '\n' +
            '       </div>\n' +
            '       <div class="col-11 bg-white d-flex justify-content-around rounded mx-auto py-2">\n' +
            '           <img src="../img/icons/locationBlue.svg" alt="logo" class="align-self-center m-auto">\n' +
            '           <span class="align-self-center m-auto px-2">' + notif.address + '</span>\n' +
            '       </div>\n' +
            '       <div class="col-12 d-flex justify-content-between m-auto mt-2">\n' +
            '           <btn class="btn btn-clearYellow text-white shadow mb-3 rounded-3" onclick="confirmNotif(' + notif.id_person + ',' + notif.id_match +')">\n' +
            '               <span>Valider</span>\n' +
            '               <img src="../img/icons/tick-square.svg" alt="logo">\n' +
            '           </btn>\n' +
            '           <btn class="btn btn-clearBlue text-white shadow mb-3 rounded-3" onclick="deleteNotif(' + notif.id_person + ',' + notif.id_match +')">\n' +
            '               <span>Refuser</span>\n' +
            '               <img src="../img/icons/close-circle.svg" alt="logo">\n' +
            '           </btn>\n' +
            '       </div>\n' +
            '   </div>\n' +
            '</div>'
        );
    }
}

/**
 * PUT request to create a notifiaction when the validate button is pressed
 * @param id_person
 * @param id_match
 */
function confirmNotif(id_person, id_match){
    let data = 'id_person=' + id_person + '&id_match=' + id_match;
    ajaxRequest('PUT', '../php/libraries/Notification/updateNotification.php', callback, data);
}

/**
 * DELETE button when the delete button is pressed
 * @param id_person
 * @param id_match
 */
function deleteNotif(id_person, id_match){
    let data = '?id_person=' + id_person + '&id_match=' + id_match;
    ajaxRequest('DELETE', '../php/libraries/Notification/deleteNotification.php' + data, callback);
}

/**
 * callback function to reload the page after pressing a button
 */
function callback(){
    location.reload();
}