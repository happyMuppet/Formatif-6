"use strict"

// On utilisera toujours cet événement pour attendre le chargement de la page avant de commencer.
$(document).ready(function(){
    $("p").hide();
})


// $("p").hide(); // Sélectionne à partir du type d'une balise.
// $("#p1").hide(); // Sélectionne à partir de l'id d'une balise p1

// $("p").css("fontWeight", "bold");

for (let element of $("p")) {
    // element.css("fontWeight", "bold");
    element.style.fontWeight =  "bold";
    console.log(element);
}
