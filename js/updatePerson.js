// AJAX request to get the person's infos
ajaxRequest('GET', '../php/libraries/Person/getPerson.php', displayModifPerson);

/**
 * function that displays the user infos when they exist
 * @param person
 */
function displayModifPerson(person){
    let displayNote =  '';
    if (person[0].application_note != null){
        for (let i = 1; i <= 5; i++) {
            if (i <= person[0].application_note){
                displayNote += '<div id="star' + i + '" onMouseUp="getStarRate(id)" onMouseOver="starFill(id)">\n' +
                    '        <img src="../img/icons/filledStar.svg" alt="logo">\n' +
                    '    </div>';
            } else {
                displayNote += '<div id="star' + i + '" onMouseUp="getStarRate(id)" onMouseOver="starFill(id)">\n' +
                    '        <img src="../img/icons/star.svg" alt="logo">\n' +
                    '    </div>';
            }
        }
    } else {
        for (let i = 1; i <= 5; i++) {
            displayNote += '<div id="star' + i + '" onMouseUp="getStarRate(id)" onMouseOver="starFill(id)">\n' +
                '        <img src="../img/icons/star.svg" alt="logo">\n' +
                '    </div>';
        }
    }

    // number of matches played cases
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

    // age cases
    let age = '';
    if (person[0].age != null){
        age += person[0].age;
        $('#ageOutput').attr("value",age);
    }

    // user's town selected
    $('#' + person[0].id_city).attr("selected","selected");

    if (person[0].id_physical_form != null){

        $('#formSelect').append('<option value="1">Professionnel</option>\n' +
            '        <option value="2">Confirmé</option>\n' +
            '        <option value="3">Amateur</option>\n' +
            '        <option value="4">Débutant</option>');

        $('#formSelect option[value=' + person[0].id_physical_form + ']').attr("selected","selected");
    } else {

        $('#formSelect').append('<option selected value="">...</option>\n' +
            '        <option value="1">Professionnel</option>\n' +
            '        <option value="2">Confirmé</option>\n' +
            '        <option value="3">Amateur</option>\n' +
            '        <option value="4">Débutant</option>');
    }

    $('#ratingOutput').append(displayNote);

    $('#defaultPhoto').html('<img class="align-self-center p-1" src="' + person[0].path + '" alt="logo" width="65" height="65">' +
        '<input class="form-check-input align-self-center" type="radio" name="avatarInput" id="avatar" value="' + person[0].id_photo + '" checked>');

    $('#nameOutput').append(person[0].name + ' ' + person[0].first_name);
}

/**
 * function that submits the user infos when they exist to modify it using AJAX requests
 * @param event
 */
function submitForm(event){
    let id_photo = $('input[name="avatarInput"]:checked').val();
    let id_city = $('#townOutput').val();

    let password1 = $('#passwordInput1').val();

    let age = $('#ageOutput').val();
    let id_physical_form = $('#formSelect').val();
    let application_note = $('#starText').val();

    let isPasswordModified = false;

    if (isNaN(age)){
        age = null;
    }
    if (isNaN(id_physical_form)){
        id_physical_form = null;
    }
    if (isNaN(application_note)){
        application_note = null;
    }
    if (password1 === ''){
        password1 = null;
    }

    let data = 'id_photo=' + id_photo + '&id_city=' + id_city + '&password=' + password1 + '&age=' + age + '&id_physical_form=' + id_physical_form + '&application_note=' + application_note;
    console.log(data);
    ajaxRequest('PUT', '../php/libraries/Person/updatePerson.php',putSuccess, data);
}

function putSuccess(){
    console.log("request update success");
    document.location.href="profile.html";
}

/**
 * function using the user rate to display it with stars
 * @param id_star
 */
function starFill(id_star){

    var filledStar = "<a href=\"javascript:void(0)\" class=\"cursor-pointer\">\n" +
        "                    <img src=\"../img/icons/filledStar.svg\" alt=\"logo\">\n" +
        "                </a>";
    var star = "<a href=\"javascript:void(0)\" class=\"cursor-pointer\">\n" +
        "                    <img src=\"../img/icons/star.svg\" alt=\"logo\">\n" +
        "                </a>";

    let id;
    for (let i = 1; i <= 5; i++) {
        if (i <= (id_star.slice(id_star.length - 1))){
            id = "star" + i;
            document.getElementById(id).innerHTML = filledStar;
        } else {
            id = "star" + i;
            document.getElementById(id).innerHTML = star;
        }
    }
}

/**
 * function that get the app score using stars
 * @param id_star
 */
function getStarRate(id_star){
    let id = id_star;
    let rate = id.slice(id.length - 1);
    $('#starText').val(rate);
}