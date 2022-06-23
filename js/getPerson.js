ajaxRequest('GET', '../php/libraries/Person/getPerson.php', displayPerson);

function displayPerson(person){
    console.log(person);
    let displayNote =  '';
    for (let i = 1; i <= 5; i++) {
        if (i <= person[0].application_note){
            displayNote += '<img src="../img/icons/filledStar.svg" alt="logo">';
        } else {
            displayNote += '<img src="../img/icons/star.svg" alt="logo">';
        }
    }

    let nbrMatchPlayed = '';
    if (person[0].count == null){
        nbrMatchPlayed = '0 match joué';
    }
    if (person[0].count == 1){
        nbrMatchPlayed = person[0].count + 'match joué';
    }
    if (person[0].count > 1){
        nbrMatchPlayed = person[0].count + 'matchs joués';
    }
    if (person[0].name_form === null){
        person[0].name_form = '';
    }

    $('#photoProfile').append('<img class="form-label col-4 m-2" src=' + person[0].path + ' alt="logo">\n');

    $('#profileSpace').append(' <div class="p-3 mb-3 rounded-2 bg-clearGrey border-0">\n' +
        '    <span id="nameOutput">'+ person[0].name + ' ' + person[0].first_name + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/map.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Ville :</span>\n' +
        '    <span id="townOutput">' + person[0].name_city + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/user.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Âge :</span>\n' +
        '    <span id="ageOutput">'+ person[0].age +'</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/mail.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">E-mail :</span>\n' +
        '    <span id="mailOutput">' + person[0].email + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/security-safe.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Mot de passe :</span>\n' +
        '    <span id="passwordOutput">•••••••••••••</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/user.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Forme sportive :</span>\n' +
        '    <span id="formOutput">' + person[0].name_form + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0 d-flex flex-nowrap align-items-center">\n' +
        '    <img src="../img/icons/LogoBisStrong.svg" alt="logo">\n' +
        '    <span class="px-2">Notez l\'application</span>\n' +
        '    <div id="ratingOutput">\n' + displayNote +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <label class="form-label d-flex mb-3">Mes statistiques</label>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0 align-items-center">\n' +
        '    <img src="../img/icons/badge.svg" alt="logo">\n' +
        '    <span id="statOutput">' + nbrMatchPlayed + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="align-items-center">\n' +
        '    <a class="btn btn-clearYellow nav-item text-white shadow mb-3 rounded-3" href="modifProfile.html">\n' +
        '      <img src="../img/icons/edit.svg" alt="logo">\n' +
        '      <span>Modifier</span>\n' +
        '    </a>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="mb-3 align-items-center">\n' +
        '    <a class="btn btn-darkYellow nav-item text-white shadow rounded-3" onclick="disconnect()">\n' +
        '      <img src="../img/icons/logout.svg" alt="logo">\n' +
        '      <span>Se déconnecter</span>\n' +
        '    </a>\n' +
        '  </div>');
}


function disconnect(event){
    ajaxRequest('GET', '../php/libraries/Person/disconnect.php', callback);
}

function callback(message){
    console.log(message);
    document.location.href="connection.html";
}