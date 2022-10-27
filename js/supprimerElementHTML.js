"use strict"

// function supprimerElementCliquer(event) {
    // if (event.target.nodeName == "LI") {
    //     if (confirm("Êtes-vous sûr de vouloir supprimer la puce : " + event.target.textContent)) {
    //         event.target.remove();
    //     }
    // } else {
    //     alert("Vous avez cliqué sur la liste \"" + event.target.nodeName + "\" et non sur une puce :o)");
    // }
    //
    //
    // })
// let listeCours = document.querySelector("#cours");
// listeCours.addEventListener("click", supprimerElementCliquer, false);

$("#cours").on({
        click : function() {
            if($(this).text() === "LI"){
                if(confirm("Êtes-vous sûr de vouloir supprimer la puce : " + $(this).text())){
                    $(this).remove();
                }
            } else {
                alert("Vous avez cliqué sur la liste " + $(this).text() + " et non sur une puce :o)");
            }
    }
})
