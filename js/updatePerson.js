ajaxRequest('GET', '../php/libraries/Person/getPerson.php', displayModifPerson);

function displayModifPerson(person){
    let displayNote =  '';
    if (person[0].application_note != null){
        for (let i = 1; i <= 5; i++) {
            if (i <= person[0].application_note){
                displayNote += '<div id="star5" onMouseUp="getStarRate(id)" onMouseOver="starFill(id)">\n' +
                    '        <img src="../img/icons/filledStar.svg" alt="logo">\n' +
                    '    </div>';
            } else {
                displayNote += '<div id="star5" onMouseUp="getStarRate(id)" onMouseOver="starFill(id)">\n' +
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

    $('#ageOutput').append('<input type="text" class="form-control rounded-3 bg-clearGrey shadow shadow-inset" id="ageInput" placeholder="age" value="' + personAge + '">\n' +
        '        <label class="ps-4 text-darkGrey" for="ageInput">Entrez votre âge</label>');
}

$('#updateForm').on('submit', (event) =>
{
    let id_photo = $('input[name="avatarInput"]:checked').val();
    let id_city = $('#townInput').val();
    let age = $('#ageInput').val();
    let email = $('#mailInput').val();
    let password = $('#passwordInput').val();
    let id_physical_form = $('#formSelect').val();
    event.preventDefault();
    ajaxRequest('PUT', '../php/libraries/Person/updatePerson.php',displaySuccess,'id_photo=' + id_photo + '&id_city=' + id_city + '&email=' + email + '&password=' + password + '&age=' + age + '&id_physical_form=' + id_physical_form);
});

function displaySuccess(){
    console.log("request create success");
    document.location.href="profile.html";
}