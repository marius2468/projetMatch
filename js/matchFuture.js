// AJAX request to get all the future matches
ajaxRequest('GET', '../php/libraries/Match/getMatchPassedFuture.php?passed=1', displayMatchFuture);

// callback function displaying future matches
function displayMatchFuture(matchs){
    console.log(matchs);

    for (let match of matchs){
        let date_time = match.date_time.split(' ');
        if (match.count == null){
            match.count = 0;
        }

        // displaying in html the match infos
        $('#match').append(
            '<div class="row g-3 align-items-center bg-clearYellow mt-3 rounded shadow py-3 justify-content-between text-white text-decoration-none">\n' +
            '   <h4 class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 fw-bold">' + match.city_name + '</h4>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de jouer maximum : ' + match.nb_max + '</span>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Le : ' + date_time[0] + '</span>\n' +
            '   <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 align-items-center">\n' +
            '       <span>' + match.name_sport + '</span>\n' +
            '       <img src="' + match.path + '" alt="' + match.name_sport + '">\n' +
            '   </div>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de joueur inscrit : ' + match.count + '</span>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">A : ' + date_time[1] + '</span>\n' +
            '</div>'
        );
    }
}