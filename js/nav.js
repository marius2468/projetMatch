/**
 * nav function called in all files to display the navbar
 */
function nav(){
    let link1 = document.getElementById('nav-button1');
    let link2 = document.getElementById('nav-button2');
    let link3 = document.getElementById('nav-button3');

    let width = window.innerWidth;
    if (width > 991) {
        link1.className = 'nav-item btn btn-clearYellow align-self-center shadow shadow-inset text-white';
        link2.className  = 'nav-item btn btn-darkYellow align-self-center shadow text-white';
        link3.innerHTML = '<img src="../img/icons/profile.svg" alt="profile" height="50">';
    }
    else {
        link1.className = 'nav-item text-decoration-none text-white';
        link2.className = 'nav-item text-decoration-none text-white';
        link3.className = 'text-decoration-none text-white';
        link3.innerHTML = 'Profile';
    }
}

window.addEventListener('resize', nav);
window.addEventListener('load', nav);