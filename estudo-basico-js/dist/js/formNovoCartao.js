"use strict";

;(function () {
    var form = document.querySelector(".formNovoCartao");
    var textArea = document.querySelector(".formNovoCartao-conteudo");
    // const mural = document.querySelector(".mural");
    // let contCartao = 1;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (textArea.value.trim() == "") {
            var divMensagem = document.createElement("div");
            divMensagem.textContent = "Por favor, digite uma mensagem";
            divMensagem.classList.add("formNovoCartao-msg");

            form.insertAdjacentElement("beforebegin", divMensagem);

            divMensagem.addEventListener("animationend", function (event) {
                divMensagem.remove();
            });
        } else {
            criarCartao({ conteudo: textArea.value });
            form.reset();
        }
    });
})();