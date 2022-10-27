"use strict";

/**
 *Formatif 5 numéro 1 sur le BOM
 */

let fen = null;

function main() {
    document.getElementById("Open").addEventListener("click", ouvrirFenetre);
    document.getElementById("Close").addEventListener("click", fermerFenetre);
}

function ouvrirFenetre() {
    if (fen == null || fen.pasOuverte()) {
        fen = new Fenetre(window);
        fen.ouvrir();
    }

    fen.focus();
}

function fermerFenetre() {
    if (!fen.fermer()) {
        alert("Aucune fenêtre à fermer!")
    }

    fen = null;
}

main();





