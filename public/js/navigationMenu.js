let asideButton = document.getElementById("asideButton");
let asideSection = document.getElementById("asideSection");
let isClicked = false;
asideButton.addEventListener('click', function() {
    asideSection.classList.toggle('activeAsideSection');
    if (!isClicked) {
        asideButton.setAttribute("name", "close-outline");
    } else {
        asideButton.setAttribute("name", "menu-outline");
    }
    isClicked = !isClicked;
})