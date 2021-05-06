// *******************************************************************************
// ****************** BOUTON HAUT DE PAGE ****************************************
// *******************************************************************************

let topLink = document.querySelector("#topLink");
// Au scroll de la fenêtre, le bouton apparaît
document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function() {
      topLink.className = (window.pageYOffset > 100) ? "show" : "hide";
    };
});

