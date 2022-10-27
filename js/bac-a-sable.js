"use strict"

/** On utilisera toujours cet événement pour attendre le chargement
/* de la page avant de commencer. Cette méthode de JQuerry nous
* permet d'éxécuter le code jQuerry dès que le document est ready.
* Les deux méthodes suivantes sont équivalentes. */
// $(document).ready(function(){
//     $("p").hide();
// })
//Ces deux méthodes sont équivalentes.
$(function(){
    $("#p1").html("My baby shot me down!");
    let balise = $("#p1").html();
    $("#p1").wrap("<div></div>");
    console.log(balise);

})




// Sélection de balises  et application d'une méthode
// $("p").hide(); // Sélectionne à partir du type d'une balise.
// $("#p1").hide(); // Sélectionne à partir de l'id d'une balise p1

// Application de style en utilisant la méthode css
// $("p").css("fontWeight", "bold");
// Boucle pour parcourir le tableau de balise p et applique un style.
// for (let element of $("p")) {
//     // element.css("fontWeight", "bold");
//     element.style.fontWeight =  "bold";
//     console.log(element);
// }


