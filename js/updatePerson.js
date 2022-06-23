ajaxRequest('GET', '../php/libraries/Person/getPerson.php', displayModifPerson);

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

    let age = "";
    if (person[0].age != null){
        age += person[0].age;
        $('#ageOutput').attr("value",age);
    }

    $('#' + person[0].id_city).attr("selected","selected");

    if (person[0].id_physical_form != null){
        $('#formSelect option[value=' + person[0].id_physical_form + ']').attr("selected","selected");
    }

    $('#ratingOutput').append(displayNote);

    $('#nameOutput').append(person[0].name + ' ' + person[0].first_name);
}

function submitForm(event){

    let id_photo = $('input[name="avatarInput"]:checked').val();
    let id_city = $('#townOutput').val();
    let age = $('#ageOutput').val();
    let password;
    if ($('#passwordInput').val() == '•••••••••'){
        password = null
    } else {
        password = $('#passwordInput').val();
    }
    let id_physical_form = $('#formSelect').val();
    let application_note = $('#ratingOutput').val();
    let data = 'id_photo=' + id_photo + '&id_city=' + id_city + '&password=' + password + '&age=' + age + '&id_physical_form=' + id_physical_form + '&application_note=' + application_note;
    console.log(data);
    ajaxRequest('PUT', '../php/libraries/Person/updatePerson.php',putSuccess, data);
}

function putSuccess(){
    console.log("request create success");
    document.location.href="profile.html";
}

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

function getStarRate(id_star){
    let id = id_star;
    let rate = id.slice(id.length - 1);
    $('#ratingOutput').val(rate);
}