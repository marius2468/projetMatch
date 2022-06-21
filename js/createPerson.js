$('#signUp').on('click', (event) =>
{
    if (!empty($data['first_name']) && !empty($data['name']) && !empty($data['email']) && !empty($data['password']) && !empty($data['id_photo']) && !empty($data['id_city'])){
        let id_photo = $('input[name="avatarInput"]:checked').val();
        let id_city = $('#townInput').val();
        let email = $('#mailInput').val();
        let age = $('#ageInput').val();
        let password = $('#passwordInput').val();
        event.preventDefault();
        ajaxRequest('PUT', '../php/libraries/createPerson.php',displaySuccess,'id_photo=' + id_photo + '&name=' + name + '&first_name=' + first_name + '&id_city=' + id_city + '&email=' + email + '&password=' + password);
    }


});

function displaySuccess(){
    console.log("request update success");
}