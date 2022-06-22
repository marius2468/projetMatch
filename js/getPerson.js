$('#signUpForm').on('submit', (event) =>
{
    let session;
    ajaxRequest('GET', '../php/libraries/Person/getPerson.php?' + session,displayProfile);


    let id_photo = 0;
    let name = 0;
    let first_name = 0;
    let id_city = 0;
    let age =0;
    let email = 0;
    let password = 0;
    let id_physical_form = 0;
    let application_note = 0;

    event.preventDefault();
});


function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

let id_person = $_GET('id_person')

ajaxRequest('GET', '../php/libraries/Person/getPerson.php?id_person=' + id_person, displayPerson);

function displayPerson(person){

    $('#profileSpace').append('<img class="form-label d-flex justify-content-center p-3" src="../img/icons/profileBlue.svg" alt="logo" height="150">\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0">\n' +
        '    <span id="nameOutput">'+ person.name + ' ' + person.first_name + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/map.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Ville :</span>\n' +
        '    <span id="townOutput">' + person.city_name + '</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/user.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Âge :</span>\n' +
        '    <span id="ageOutput">XX</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/mail.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">E-mail :</span>\n' +
        '    <span id="mailOutput">exemple@mail.fr</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/security-safe.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Mot de passe :</span>\n' +
        '    <span id="passwordOutput">•••••••••••••••</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 border border-clearGrey border-3 align-items-center">\n' +
        '    <img src="../img/icons/user.svg" alt="logo">\n' +
        '    <span class="px-2 text-clearGrey">Forme sportive :</span>\n' +
        '    <span id="formOutput">...</span>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0 d-flex flex-nowrap align-items-center">\n' +
        '    <img src="../img/icons/LogoBisStrong.svg" alt="logo">\n' +
        '    <span class="px-2">Notez l\'application</span>\n' +
        '    <div id="ratingOutput">\n' +
        '      <img src="../img/icons/filledStar.svg" alt="logo">\n' +
        '      <img src="../img/icons/filledStar.svg" alt="logo">\n' +
        '      <img src="../img/icons/filledStar.svg" alt="logo">\n' +
        '      <img src="../img/icons/filledStar.svg" alt="logo">\n' +
        '      <img src="../img/icons/star.svg" alt="logo">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <label class="form-label d-flex mb-3">Mes statistiques</label>\n' +
        '\n' +
        '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0 align-items-center">\n' +
        '    <img src="../img/icons/badge.svg" alt="logo">\n' +
        '    <span id="statOutput">23 matchs joués</span>\n' +
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
        '    <a class="btn btn-darkYellow nav-item text-white shadow rounded-3" href="connection.html">\n' +
        '      <img src="../img/icons/logout.svg" alt="logo">\n' +
        '      <span>Se déconnecter</span>\n' +
        '    </a>\n' +
        '  </div>');

    ajaxRequest('GET', '../php/libraries/Person/getPerson.php?id_match=' + id_match, displayParticipants);
}

function displayParticipants(participants){
    let element;
    element = document.createElement('div');
    element.className = 'col-11 bg-clearGrey rounded mx-auto shadow-inset shadow';
    element2 = document.createElement('h5')
    element2.className = 'text-black m-2';
    element2.innerHTML = 'Liste des participants';
    element.append(element2);
    /*$('#match').append('<div class="col-11 bg-clearGrey rounded mx-auto shadow-inset shadow">' +
                        '<h5 class="text-black m-2">Liste des participants</h5>');*/
    let element3;
    for (let participant of participants) {
        element3 = document.createElement('div');
        element3.className = 'row bg-clearYellow rounded g-2 my-2 shadow';
        element3.innerHTML = '<div class="col-6 justify-content-between my-auto ps-2">\n' +
            '<img src="' + participant.path + '" alt="profile" height="50px">\n' +
            '<span>' + participant.first_name + ' ' + participant.name + '</span>\n' +
            '</div>\n' +
            '<div class="col-6 d-flex my-auto pe-2 justify-content-end">\n' +
            '       ' + participant.count + ' matchs joués\n' +
            '</div>\n';
        element.append(element3);
    }
    document.getElementById('match2').append(element);
}