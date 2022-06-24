// AJAX request to get the match's statistics
ajaxRequest('GET', '../php/libraries/Match/getStats.php', displayStats);

/**
 * callback function displaying the match statistics
 * @param stats
 */
function displayStats(stats){
    console.log(stats);
    for (let stat of stats){
        let date_time = stat.date_time.split(' ');

        // changing the value to display 0 instead of null
        if (stat.count == null){
            stat.count = 0;
        }

        // displaying in html
        $('#stats').append(
            '<a href="#" class="row g-3 align-items-center bg-clearYellow mt-3 rounded shadow shadow-inset py-3 justify-content-between text-white text-decoration-none">\n' +
            '   <h4 class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 fw-bold">' + stat.city_name + '</h4>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de jouer maximum : ' + stat.nb_max + '</span>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Le : ' + date_time[0] + '</span>\n' +
            '   <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 align-items-center">\n' +
            '       <span>' + stat.name_sport + '</span>\n' +
            '       <img src="' + stat.path + '" alt="' + stat.name_sport + '">\n' +
            '   </div>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Nombre de joueur inscrit : ' + stat.count + '</span>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">A : ' + date_time[1] + '</span>\n' +
            '</a>\n' +
            '<a class="btn btn-clearBlue text-white shadow m-3 rounded-3" href="statForm.html?id_match=' + stat.id_match + '">\n' +
            '   <img src="../img/icons/calendar-edit.svg" alt="logo">\n' +
            '   <span>Entrer les statistiques</span>\n' +
            '</a>'
        )
    }
}