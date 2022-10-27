"use strict"

function cliquerPara(event) {
    event.preventDefault();
    $("span").css("fontWeight", "normal").css("color", "black");
}

function dblCliquerPara(event) {
    $("span").css("fontWeight", "bold").css("color", "red");

}

let para = document.querySelector("#para");
para.addEventListener("click", cliquerPara);
para.addEventListener("dblclick", dblCliquerPara);