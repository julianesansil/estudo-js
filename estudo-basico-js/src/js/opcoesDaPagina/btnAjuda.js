
; (function () {
    'use strict'

    let btnAjuda = document.querySelector("#btnAjuda");

    // let informacoes = [
    //     { texto: "Bem vindo ao Ceep!", cor: "red" },
    //     { texto: "O site é otimizado para celulares!", cor: "yellow" },
    //     { texto: "Para mudar o layout, clique no botão linha do cabeçalho", cor: "blue" }
    // ];

    btnAjuda.addEventListener("click", function () {
        let conexaoAPI = new XMLHttpRequest();
        conexaoAPI.open("GET", "http://ceep.herokuapp.com/cartoes/instrucoes");
        conexaoAPI.responseType = "json"
        conexaoAPI.send();

        conexaoAPI.addEventListener("load", () => {
            let informacoes = conexaoAPI.response.instrucoes;

            informacoes.forEach(info => {
                criarCartao(info, "beforeend");
                // alert(info);
            });
        });
    });

    btnAjuda.classList.remove("no-js");
})()