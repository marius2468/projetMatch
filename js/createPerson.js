$('#signUp').on('click', (event) =>
{
    let id_photo = $('input[name="avatarInput"]:checked').val();
    let name = $('#nameInput').val();
    let first_name = $('#firstNameInput').val();
    let id_city = $('#townInput').val();
    let email = $('#mailInput').val();
    let password = $('#passwordInput').val();
    event.preventDefault();
    ajaxRequest('POST', '../php/libraries/createPerson.php',displaySuccess,'id_photo=' + id_photo + '&name=' + name + '&first_name=' + first_name + '&id_city=' + id_city + '&email=' + email + '&password=' + password);
});

function displaySuccess($data){
    console.log($data);
}