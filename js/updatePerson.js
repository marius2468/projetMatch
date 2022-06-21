$('#updateForm').on('submit', (event) =>
{
    let id_photo = $('input[name="avatarInput"]:checked').val();
    let id_city = $('#townInput').val();
    let age = $('#ageInput').val();
    let email = $('#mailInput').val();
    let password = $('#passwordInput').val();
    let id_physical_form = $('#formSelect').val();
    event.preventDefault();
    ajaxRequest('PUT', '../php/libraries/Person/updatePerson.php',displaySuccess,'id_photo=' + id_photo + '&id_city=' + id_city + '&email=' + email + '&password=' + password);
    document.location.href="profile.html";
});

function displaySuccess(){
    console.log("request create success");
}