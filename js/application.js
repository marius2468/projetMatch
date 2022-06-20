function starFill(id_star){
    var filledStar = "<a href=\"javascript:void(0)\" class=\"cursor-pointer\">\n" +
        "                    <img src=\"../img/icons/filledStar.svg\" alt=\"logo\">\n" +
        "                </a>";
    var star = "<a href=\"javascript:void(0)\" class=\"cursor-pointer\">\n" +
        "                    <img src=\"../img/icons/star.svg\" alt=\"logo\">\n" +
        "                </a>";

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