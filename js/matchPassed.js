ajaxRequest('GET', '../php/libraries/Match/getMatchPassedFuture.php?passed=2', displayMatchPassed)

function displayMatchPassed(matchs){
    for (let match of matchs){
        let date_time = match.date_time.split(' ');
        if (match.count == null){
            match.count = 0;
        }
        if (match.score === ''){
            match.score = 'Pas encore de score';
        }
        if (match.first_name == null){
            match.first_name = 'Pas encore';
        }
        if (match.name == null){
            match.name = 'de meilleur joueur';
        }
        if (match.path == null){
            match.path = '../img/icons/profile.svg';
        }
        $('#match').append(
            '<div href="#" class="row g-3 align-items-center bg-clearYellow mt-3 rounded shadow shadow-inset py-3 justify-content-between text-white text-decoration-none">\n' +
            '   <h4 class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 fw-bold">' + match.city_name + '</h4>\n' +
            '   <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 align-items-center">\n' +
            '       <span>Meilleur Joueur : </span>\n' +
            '       <img src="' + match.path + '" alt="profile" height="50">\n' +
            '       <span>' + match.first_name + ' ' + match.name + '</span>\n' +
            '   </div>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Le : ' + date_time[0] + '</span>\n' +
            '    <div class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1 align-items-center">\n' +
            '       <span>' + match.name_sport + '</span>\n' +
            '       <img src="' + match.sportpath + '" alt="' + match.name_sport + '">\n' +
            '   </div>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">Score : ' + match.score + '</span>\n' +
            '   <span class="col-12 col-md-6 col-sm-12 col-lg-4 my-lg-1">A : ' + date_time[1] + '</span>\n' +
            '</div>'
        );
    }
}