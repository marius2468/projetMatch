/**
 * Get function who returns the element associated to a given id
 * @param param
 * @returns {{}|*|null}
 */
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

// returns the match associated to the given id
let id_match = $_GET('id_match')

// AJAX resquest sending the id of a match to get it
ajaxRequest('GET', '../php/libraries/Match/getMatch.php?id_match=' + id_match, displayDetails);

/**
 * callback function displaying the match infos
 * @param match
 */
function displayDetails(match){
    console.log(match);
    let date_time = match[0].date_time.split(' ');

    // displaying in html
    $('#stat').prepend(
        '<h1 class="form-label d-flex justify-content-center p-3">Statistiques</h1>' +
        '<div class="btn btn-clearBlue d-flex align-items-center justify-content-around text-white shadow-lg p-3 mb-5 rounded-3 justify-content-center">\n' +
        '   <img src="../img/icons/location.svg" alt="logo">\n' +
        '   <span>' + match[0].address + '</span>\n' +
        '   <span>' + date_time[0] + ' à ' + date_time[1] + '</span>\n' +
        '</div>' +
        '<label class="form-label flex-nowrap">Score du matcht*</label>\n' +
        '<div class="form-floating mb-3 d-flex">\n' +
        '   <input type="text" class="form-control rounded-3 bg-clearGrey shadow shadow-inset" id="scoreInput" placeholder="sport">\n' +
        '   <label class="ps-4 text-darkGrey" for="scoreInput">Entrez le score du match</label>\n' +
        '</div>'
    )
}

// AJAX request to get all the participants for the best player selection
ajaxRequest('GET', '../php/libraries/Person/getPerson.php?id_match=' + id_match, displayPersonStats);

/**
 * displays the participants in the best player selection
 * @param persons
 */
function displayPersonStats(persons){
    for (let person of persons){
        $('#bestPlayerInput').append(
            '<option value="' + person.id_person + '">' + person.first_name + ' ' + person.name + '</option>'
        )
    }
}

//
function statEnter(event){
    let best_player = $('#bestPlayerInput').val();
    let score = $('#scoreInput').val();

    // check if all the inputs are filled
    if ((!best_player) || (!score)){
        console.log('pas rempli');
        $('#errors').html('Veuillez entrer tout les champs !');
        $('#errors').show();
    }
    else {
        // AJAX request to update the match infos
        $('#errors').hide();
        let data = 'id_match=' + id_match + '&score=' + score + '&id_person=' + best_player;
        ajaxRequest('PUT', '../php/libraries/Match/updateMatch.php', redirect, data);
    }
}

/**
 * callback function redirection to the stat page
 * @param message
 */
function redirect(message){
    console.log(message);
    document.location.href="statOrga.html";
}