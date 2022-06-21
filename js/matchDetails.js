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

let id_match = $_GET('id_match')

ajaxRequest('GET', '../php/libraries/Match/getMatch.php?id_match=' + id_match, displayMatch);

function displayMatch(match){
    let date_time = match[0].date_time.split(' ');
    if (match[0].count == null){
        match[0].count = 0;
    }
    $('#match').append('<div class="row g-3 align-items-center bg-clearYellow mt-3 rounded shadow py-3 justify-content-between text-white text-decoration-none">\n' +
        '                   <h4 class="col-12 my-lg-1 fw-bold">' + match[0].address + '</h4>\n' +
        '                   <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 align-items-center">\n' +
        '                       <span>' + $_GET('name_sport') + '</span>\n' +
        '                       <img src="' + $_GET('sportPath') + '" alt="' + $_GET('name_sport') + '">\n' +
        '                   </div>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de jouer maximum : ' + match[0].nb_max + '</span>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Le : ' + date_time[0] + '</span>\n' +
        '                   <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">\n' +
        '                       <span>Organisateur :</span>\n' +
        '                       <img src="' + match[0].path + '" alt="profile" height="50px">\n' +
        '                       <span>' + match[0].first_name + ' ' + match[0].person_name + '</span>\n' +
        '                   </div>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de joueur inscrit : ' + match[0].count + '</span>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">A : ' + date_time[1] + '</span>\n' +
        '                   <span class="col-lg-4 hidden"> </span>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Prix : ' + match[0].price + '€</span>\n' +
        '                   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Durée : ' + match[0].duration + '</span>\n' +
        '                   <div class="col-12 my-lg-1">\n' +
        '                       <button class="w-auto my-lg-1 btn btn-clearBlue">Réserver</button>\n' +
        '                   </div>\n' +
        '               </div>');
    ajaxRequest('GET', '../php/libraries/Person/getPerson.php?id_match=' + id_match, displayParticipants);
}

function displayParticipants(participants){
    $('#match').append('<div class="col-11 bg-clearGrey rounded mx-auto shadow-inset shadow">' +
                        '<h5 class="text-black m-2">Liste des participants</h5>');
    for (let participant of participants){
        $('#match').append(
            '<div class="row bg-clearYellow rounded g-2 my-2 shadow">\n' +
            '   <div class="col-6 justify-content-between my-auto ps-2">\n' +
            '       <img src="' + participant.path + '" alt="profile" height="50px">\n' +
            '       <span>' + participant.first_name + ' ' + participant.name + '</span>\n' +
            '   </div>\n' +
            '   <div class="col-6 d-flex my-auto pe-2 justify-content-end">\n' +
            '       ' + participant.count + ' matchs joués\n' +
            '   </div>\n' +
            '</div>'
        );
    }
    $('#match').append('</div>');
}