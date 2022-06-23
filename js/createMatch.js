// function sending an AJAX request to createMatch.php with the input values of the match
function createClicked(event){
    let id_sport = $('#sportInput').val();
    let id_city = $('#townInput').val();
    let address = $('#addressInput').val();
    let date_time = $('#hourInput').val();
    date_time = date_time.replace('T', ' ');
    date_time += ':00';
    let duration = $('#durationInput').val();
    duration += ' min'
    let price = $('#priceInput').val();
    console.log(
        'id_sport:' + id_sport + '\n' +
        'id_city:' + id_city + '\n' +
        'address:' + address + '\n' +
        'date_time:' + date_time + '\n' +
        'duration:' + duration + '\n' +
        'price:' + price + '\n'
    );
    let data = 'id_sport=' + id_sport + '&id_city=' + id_city + '&address=' + address + '&date_time=' + date_time + '&duration=' + duration + '&price=' + price
    ajaxRequest('POST', '../php/libraries/Match/createMatch.php', callback, data);
}

// callback function redirecting to the main organisator page
function callback(message){
    console.log(message);
    document.location.href="notifsOrga.html";
}