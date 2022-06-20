function starFill(id_star){
    var filledStar = "<img src=\"../img/filledStar.svg\" alt=\"logo\">";
    var star = "<img src=\"../img/star.svg\" alt=\"logo\">";

    for (let i = 1; i <= 5; i++) {
        if (i <= (id_star.slice(id_star.length - 1))){
            var id = "star" + i;
            document.getElementById(id).innerHTML = filledStar;
        } else {
            var id = "star" + i;
            document.getElementById(id).innerHTML = star;
        }
    }
}

function getStarRate(id_star){

    var id = id_star;
    var rate = id.slice(id.length - 1);
    console.log(rate);
}

function validateProfil(){

}