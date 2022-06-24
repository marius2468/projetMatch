// function using POST request to give the input infos to createPerson.php to create a new person
function onSubmit(event){
    let id_photo = $('input[name="avatarInput"]:checked').val();
    let name = $('#nameInput').val();
    let first_name = $('#firstNameInput').val();
    let id_city = $('#townInput').val();
    let email1 = $('#mailInput1').val();
    let email2 = $('#mailInput2').val();
    let password1 = $('#passwordInput1').val();
    let password2 = $('#passwordInput2').val();
    if (password1 === password2 && email1 === email2){
        ajaxRequest('POST', '../php/libraries/Person/createPerson.php',displaySuccess,'id_photo=' + id_photo + '&name=' + name + '&first_name=' + first_name + '&id_city=' + id_city + '&email=' + email1 + '&password=' + password1);
    } else {
      $('#errors').html('<label class="form-label">E-mails ou mots de passes différents</label>');
    }
}

// callback function redirecting to the main page
function displaySuccess(){
    console.log("request create success");
    document.location.href="searchMatch.html";
}