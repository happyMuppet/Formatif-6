"use strict"

/**
 * Ici nous partons avec une base de HTML déjà en place dans le fichier HTML
 */
function afficherInterface() {

    //Création de l'intro et de l'exemple de saisie
    let divTemp = document.querySelector("div.divFormulaire");
    divTemp.appendChild(creerLabel("valeursFormes", "Entrez ici les valeurs selon l'exemple, pour faire les calculs :"));
    divTemp.appendChild(creerPara("", "exemple : \"c\" pour cercle et \"r\" pour rectangle", "exemples"));
    //Ici un peu plus complexe, car je n'est pas d'id :o(
    document.querySelector("p.exemples").appendChild(creerBlockquote("", "c 23<br/>r 23 46<br/>r 21 67<br/>c 67", "exemples"));

    //Création du champ de saisie
    divTemp.appendChild(creerTextArea("valeursFormes"));
    valeursFormes.placeholder = "Entrez vos valeurs ici selon l'exemple";

    //Création des choix "radio"
    let paraChoix = creerPara("");
    paraChoix.append(creerInput("radio", "radioCalculerAire", "choixDeCalcul", "calculerAire"),
        creerLabel("radioCalculerAire", "Calculer l'aire"), creerBr(),
        creerInput("radio", "radioCalculerPerimetre", "choixDeCalcul", "calculerPerimetre"),
        creerLabel("radioCalculerPerimetre", "Calculer le périmètre"), creerBr(),
        creerInput("radio", "radioCalculerLesDeux", "choixDeCalcul", "calculerLesDeux"),
        creerLabel("radioCalculerLesDeux", "Calculer l'aire et le perimetre"));

    divTemp.appendChild(paraChoix);
    //sélectionner arbitrairement un choix
    divTemp.querySelectorAll("input")[0].checked = true;

    //Création des boutons
    let fieldsetTemp = document.querySelector("fieldset");
    fieldsetTemp.append(creerButton("btnCalculer", "Calculer"),
        creerButton("btnVider", "Vider le champ de saisie"),
        creerSpan("", "   "),
        creerButton("btnRemplir", "Remplir le champ de saisie <label class=\"exemples\">(pour les tests)</label>"));

    //Création des éléments pour afficher le résultat
    let paraTemp = creerPara("");
    let labelTemp = creerLabel("");
    labelTemp.id = "resultats";
    paraTemp.append(labelTemp);
    //Je n'ai pas de id :o(
    document.querySelector("div.divReponse").append(paraTemp);
}


/**
 *  Permets de remplacer une série d'espaces contigus par un seul espace

 * @param chaine, une chaine de caractères
 * @returns {string}
 */
function filtrerXEspacesParUn(chaine) {
    let chaineRetour = "";
    let basculeEspace = true;
    chaine = chaine.trim();

    //on pourrait aussi utiliser un "replace" avec une "regx"

    for (let i = 0; i < chaine.length; i++) {
        if ((chaine[i] === " ") && basculeEspace) {
            chaineRetour += chaine[i];
            basculeEspace = false;
        }

        if (chaine[i] !== " ") {
            chaineRetour += chaine[i];
            basculeEspace = true;
        }
    }

    return chaineRetour;
}

/**
 * Permets une première filtration et organisation de l'information en tableau
 *
 * @param chaineInfo, la chaine d'info brute avec des retours de chariot
 * @returns {string[]}
 */
function creerTabString(chaineInfo) {

    //Diviser les lignes
    let tabString = chaineInfo.trim().split("\n");

    for (let i = 0; i < tabString.length; i++) {
        //Trace
        tabString[i] = filtrerXEspacesParUn(tabString[i].trim());
    }

    return tabString;
}


/**
 * Crée les objets cercles ou rectangles potentiellement valides à partir d'un tableau de chaine
 *
 * @param tabString, un tableau de chaines d'info brute pour définir les formes
 *
 * @return un array des objets cercle ou rectangle si valide
 */
function creerTabObjetForme(tabString) {

    let tabObjets = [];

    for (let i = 0; i < tabString.length; i++) {
        //diviser la chaine pour obtenir les sous éléments
        let tabElements = tabString[i].split(" ");

        //Pendre le caractère, qui devrait être en premier dans le tableau
        let carForme = tabElements[0].trim();

        if (carForme != "") {
            //Objet cercle
            if (carForme == "c") {
                let val = tabElements[1].trim();
                //Il faut une valeur en deuxième
                if (!isNaN(val)) {
                    val = parseInt(val);
                    tabObjets.push(new Cercle(val));
                }
                //Objet rectangle
            } else if (carForme == "r") {
                let val1 = tabElements[1].trim();
                let val2 = tabElements[2].trim();
                //Il faut des valeurs en deuxième et troisième
                if (!isNaN(val1) && !isNaN(val2)) {
                    val1 = parseInt(val1);
                    val2 = parseInt(val2);
                    tabObjets.push(new Rectangle(val1, val2));
                }
            } else {
                //Pas un bon caractère
            }
        }
    }

    return tabObjets;
}

/**
 * Contients la logique d'affaire qui à partir d'une entrée texte, fabrique des objets valides et
 * fait les calculs demandés sur les objets formes voulues
 *
 * @param event
 */
function calculerSelonDemande(event) {
    event.preventDefault();

    let tabObjetsFormes = creerTabObjetForme(creerTabString(valeursFormes.value));
    let reponse = "";

    //Soit les boucles sont dans le "if" ou le "if" dans une boucle !?!

    //On utilise le id
    if (radioCalculerAire.checked) {
        for (let i = 0; i < tabObjetsFormes.length; i++) {
            reponse += tabObjetsFormes[i] + ", dont l'aire est : " + tabObjetsFormes[i].aire() + "<br>";
        }
    } else if (radioCalculerPerimetre.checked) {
        for (let i = 0; i < tabObjetsFormes.length; i++) {
            reponse += tabObjetsFormes[i] + ", dont le périmètre est : " + tabObjetsFormes[i].perimetre() + "<br>";
        }
    } else if (radioCalculerLesDeux.checked) {
        for (let i = 0; i < tabObjetsFormes.length; i++) {
            reponse += tabObjetsFormes[i] + ", dont l'aire est : " + tabObjetsFormes[i].aire(4) + " et le périmètre est : " + tabObjetsFormes[i].perimetre(4) + "<br>";
        }
    } else {
        //Problème avec le choix
    }

    if (reponse != "") {
        resultats.innerHTML = reponse;
    } else {
        resultats.innerHTML = "Abscence de formes ou aucune forme valide";
    }
}

/**
 * Vider le champs "textarea" de saisie et l'espaces des résultats
 *
 * @param event
 */
function viderSaisie(event) {
    valeursFormes.value = "";
    resultats.innerHTML = "";
}

/**
 * Remplir le champs "textarea" de saisie pour faire des tests plus rapidement
 *
 * Peut-être modifié à volonté
 *
 * @param event
 */
function remplirSaisie(event) {
    valeursFormes.value = "   c     34\n  r 56e   7\nc   22\nr e  34  e 16\n r 84 76\n";
}

function initApp() {
    afficherInterface();

    btnCalculer.addEventListener("click", calculerSelonDemande, false);
    btnVider.addEventListener("click", viderSaisie, false);
    btnRemplir.addEventListener("click", remplirSaisie, false);
}

initApp();