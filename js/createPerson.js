
function userValidation(){

    let login = '';
    let avatar = $('#avatarInput').val();
    let name = $('#nameInput').val();
    let firstName = $('#firstNameInput').val();
    let town = $('#townInput').val();
    let mail = $('#mailInput').val();
    let password = $('#passwordInput').val();

    $('#person-add').on('submit', (event) =>
    {
        event.preventDefault();
        ajaxRequest('POST', '../php/librairies/createPerson.php',displaySuccess(),'login=' + login + 'avatar=' + avatar + '&name=' + name + '&firsName=' + firstName + '&town=' + town + '&mail=' + mail + '&password=' + password);
        $('#tweet').val('');
    });
}

function displaySuccess(){
    console.log("Success");
}