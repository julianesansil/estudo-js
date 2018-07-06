
; (function () {
    "use strict"

    let btnSync = document.querySelector("#btnSync");

    btnSync.addEventListener("click", function () {
        btnSync.classList.add("botaoSync--esperando");
        btnSync.classList.remove("botaoSync--sincronizado");

        let cartoes = document.querySelectorAll(".cartao");
        let cartoesEnvio = Array.from(cartoes).map(cartao => {
            let conteudo = cartao.querySelector(".cartao-conteudo").textContent;
            let cor = cartao.style.background;

            return {
                conteudo,
                cor
            }
        });

        let cartoesUsuario = {
            usuario: "juliane.sansil",
            cartoes: cartoesEnvio
        }

        let conexaoAPI = new XMLHttpRequest();
        conexaoAPI.open("POST", "http://ceep.herokuapp.com/cartoes/salvar");
        conexaoAPI.setRequestHeader("Content-Type", "application/json");
        conexaoAPI.send(JSON.stringify(cartoesUsuario));

        conexaoAPI.addEventListener("load", () => {
            let response = JSON.parse(conexaoAPI.response);
            console.log(`${response.quantidade} cartões salvos em ${response.usuario}`);

            btnSync.classList.remove("botaoSync--esperando");
            btnSync.classList.add("botaoSync--sincronizado");
        });

        conexaoAPI.addEventListener("error", () => {
            btnSync.classList.remove("botaoSync--esperando");
            btnSync.classList.add("botaoSync--deuRuim");
        });
    });
})()