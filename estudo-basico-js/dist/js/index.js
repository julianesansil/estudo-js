"use strict";

var btnMudaLayout = document.querySelector("#btnMudaLayout");
var muralLayout = document.querySelector(".mural");
var noJS = document.querySelectorAll(".no-js");

btnMudaLayout.addEventListener("click", function () {
    if (this.textContent.trim() == "Linhas") {
        this.textContent = "Bloco";
        // muralLayout.classList.remove("mural--linha");
    } else {
        this.textContent = "Linhas";
        // muralLayout.classList.add("mural--linha");
    }

    muralLayout.classList.toggle("mural--linha");
});

noJS.forEach(function (element) {
    element.classList.remove("no-js");
});

(function (teste) {
    console.log(teste);
})("oi");

(function () {
    return console.log("arrow function");
})();