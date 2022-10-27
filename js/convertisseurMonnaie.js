"use strict";

let tabMonnaie = null;

/**
 * Ici nous partons avec une base de HTML déjà en place dans le fichier HTML
 */
function afficherInterface() {

    //Création le champ de saisie texte du montant
    txtMontant.append(document.createTextNode("Montant :"), creerInput("text", "montant", "", "0.00"));

    //Création des boutons radios de la cellule "DE"
    let tdDe = document.querySelector("#de");
    for (let i = 0; i < tabMonnaie.length; i++) {
        tdDe.append(creerInput("radio", "de" + i, "de"),
            creerLabel("de" + i, tabMonnaie[i].devise),
            creerBr());
    }
    //sélectionner arbitrairement un choix pour "de"
    tdDe.querySelectorAll("input")[0].checked = true;

    //Création des boutons radios de la cellule "VERS"
    let tdVers = document.querySelector("#vers");
    for (let i = 0; i < tabMonnaie.length; i++) {
        tdVers.append(creerInput("radio", "vers" + i, "vers"),
            creerLabel("vers" + i, tabMonnaie[i].devise),
            creerBr());
    }
    //sélectionner arbitrairement un choix pour "vers"
    tdVers.querySelectorAll("input")[1].checked = true;

    //Créer le bouton pour le calcul
    btnConvertion.append(creerInput("button", "bCalcul", "", "Calculer la conversion"));
    bCalcul.addEventListener("click", convertir);

    //Créer les éléments html de sortie
    resultats.append(creerImg("drapeauDe"),
        creerImg("fleche"),
        creerImg("drapeauVers"),
        creerHx("h3", "ligneResultat"));
}

/**
 * Pour les besoins de l'exemple les données sont directement injectées dans le système
 * Elles pourraient provenir d'un fichier ou d'une BD
 *
 * @returns {[]}
 */
function creerObjMonnaie() {
    let vecMonnaie = [];

    vecMonnaie.push(new Monnaie("Canada", "dollars (CAN)", 1));
    vecMonnaie[vecMonnaie.length - 1].drapeau = "img/CAN.png";
    vecMonnaie.push(new Monnaie("Etats-Unis", "dollars (USD)", 1.32578));
    vecMonnaie[vecMonnaie.length - 1].drapeau = "img/USD.png";
    vecMonnaie.push(new Monnaie("Europe", "euros (EUR)", 1.4684));
    vecMonnaie[vecMonnaie.length - 1].drapeau = "img/EUR.png";
    vecMonnaie.push(new Monnaie("Mexique", "pesos (MXN)", 0.061));
    vecMonnaie[vecMonnaie.length - 1].drapeau = "img/MXN.png";
    vecMonnaie.push(new Monnaie("Angleterre", "livres (GBP)", 1.65210));
    vecMonnaie[vecMonnaie.length - 1].drapeau = "img/GBP.png";

    return vecMonnaie;
}

/**
 * Retourne l'indice de l'élément qui est choisi dans le tableau de "input" de type radio
 *
 * @param tabChoix, tableau de références sur des éléments input HTML de type radio
 * @returns {number}
 */
function trouverIndiceCheck(tabChoix) {
    let indice = -1;

    for (let i = 0; i < tabChoix.length; i++) {
        if (tabChoix[i].checked) {
            indice = i;
        }
    }

    return indice;
}

/**
 * Permet de faire la logique d'affaire pour l'action de conversion
 *
 * @param event
 */
function convertir(event) {
    let montantNumerique = 0;

    //let montantTexte = document.querySelector("#montant").value.trim();
    //oU
    let montantTexte = filtrerMontant(document.querySelector("#montant").value);

    //Vider le résultat, pour faire plus propre
    drapeauDe.src = "";
    fleche.src = "";
    drapeauVers.src = "";
    ligneResultat.innerHTML = "";

    //Avons-nous une valeur numérique
    if (!isNaN(montantTexte)) {  //OU if (determinerSiNumerique(montantTexte))
        montantNumerique = convertirStringToNumber(montantTexte); //OU Number(montantTexte) OU parseFloat(montantTexte)
        //Pour remettre la nouvelle valeur dans le champs s'il y a eu filtrage
        montant.value = montantNumerique;

        //Avons-nous une valeur numérique valide, un number > ou = à 0
        if (validerNumber(montantNumerique)) {  //OU if (valeur >= 0)
            //On veut les indices des boutons "radio" cochés
            let indiceDe = trouverIndiceCheck(document.querySelectorAll("input[name=de]"));
            let indiceVers = trouverIndiceCheck(document.querySelectorAll("input[name=vers]"));

            //avons-nous des "input radio" de choisis
            if ((indiceDe !== -1) && (indiceVers !== -1)) {
                //Faire la conversion à partir des objets
                let montantConverti = tabMonnaie[indiceDe].convertirDeVers(montantNumerique, tabMonnaie[indiceVers]);

                //Faire l'affichage des drapeaux et du résultat du calcul
                drapeauDe.src = tabMonnaie[indiceDe].drapeau;
                fleche.src = "img/fleche.jpg";
                drapeauVers.src = tabMonnaie[indiceVers].drapeau;
                ligneResultat.innerHTML = montantNumerique + " " + tabMonnaie[indiceDe].devise + " vers des " + tabMonnaie[indiceVers].devise + " donne " + montantConverti;
            } else {
                alert("Attention, il faut sélectionner les devises!");
            }
        } else {
            alert("Attention, la valeur est négative...");
        }
    } else {
        alert("Attention, le montant n'est pas une valeur numérique...");
    }
}

/**
 * initialise les évènements
 */
function initApp() {
    tabMonnaie = creerObjMonnaie();
    afficherInterface();
}

//Point d'entrée
initApp();


