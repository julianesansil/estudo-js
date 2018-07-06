"use strict";

;(function () {
    "use strict";

    var btnSync = document.querySelector("#btnSync");

    btnSync.addEventListener("click", function () {
        btnSync.classList.add("botaoSync--esperando");
        btnSync.classList.remove("botaoSync--sincronizado");

        var cartoes = document.querySelectorAll(".cartao");
        var cartoesEnvio = Array.from(cartoes).map(function (cartao) {
            var conteudo = cartao.querySelector(".cartao-conteudo").textContent;
            var cor = cartao.style.background;

            return {
                conteudo: conteudo,
                cor: cor
            };
        });

        var cartoesUsuario = {
            usuario: "juliane.sansil",
            cartoes: cartoesEnvio
        };

        var conexaoAPI = new XMLHttpRequest();
        conexaoAPI.open("POST", "http://ceep.herokuapp.com/cartoes/salvar");
        conexaoAPI.setRequestHeader("Content-Type", "application/json");
        conexaoAPI.send(JSON.stringify(cartoesUsuario));

        conexaoAPI.addEventListener("load", function () {
            var response = JSON.parse(conexaoAPI.response);
            console.log(response.quantidade + " cart\xF5es salvos em " + response.usuario);

            btnSync.classList.remove("botaoSync--esperando");
            btnSync.classList.add("botaoSync--sincronizado");
        });

        conexaoAPI.addEventListener("error", function () {
            btnSync.classList.remove("botaoSync--esperando");
            btnSync.classList.add("botaoSync--deuRuim");
        });
    });
})();