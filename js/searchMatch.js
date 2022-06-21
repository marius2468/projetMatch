$('#btnSubmit').on('click', (event) =>{
    let city = $('#townInput').val();
    let sport = $('#sportInput').val();
    let period = $('#periodInput').val();
    let complete = $('#completeInput').val();
    if (complete !== 2){
        console.log("im in 1")
        complete = 1;
    }
    event.preventDefault();
    if (city != null && sport != null && period != null){
        console.log("im in 2");
        let data = 'city=' + city + '&sport=' + sport + '&period=' + period + '&complete=' + complete;
        ajaxRequest('GET', '../php/libraries/getMatchss.php?' + data, displayMatch);
    }
});

function displayMatch(data){
    console.log(data);
}
