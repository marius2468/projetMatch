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

function displayProfile(person)
{
    // Fill tweets.
    $('#profileSpace').html('<h3>' + currentTitle + '</h3>');
    for (let i = 0; i < person.length; i++)
    {
        $('#profileSpace').append(
            // '<div class="card"><div class="card-body">' +
            // person[i].login + ' : ' + person[i].text +
            // '<div class="btn-group float-right" role="group">' +
            // '<button type="button" class="btn btn-light float-right mod"' +
            // ' value="' + person[i].id + '"><i class="fa fa-edit"></i></button>' +
            // '<button type="button" class="btn btn-light float-right del"' +
            // ' value="' + person[i].id + '"><i class="fa fa-trash"></i></button>' +
            // '<div></div></div>'
            '<img class="form-label d-flex justify-content-center p-3" src="../img/icons/profileBlue.svg" alt="logo" height="150">\n' +
            '\n' +
            '  <div class="p-3 mb-3 rounded-3 bg-clearGrey border-0">\n' +
            '    <span id="nameOutput">'+ person.name + person.first_name + '</span>\n' +
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
            '  </div>'
        );
    }
}