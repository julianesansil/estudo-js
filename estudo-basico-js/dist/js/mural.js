"use strict";

var contCartao = 1;

function criarCartao(objCartao) {
    var posicaoCartao = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'afterbegin';

    var mural = document.querySelector(".mural");

    var cartao = "\n        <article id=\"cartao_" + contCartao + "\" class=\"cartao\" tabindex=\"0\">\n            <div class=\"opcoesDoCartao\">\n                <button class=\"opcoesDoCartao-remove opcoesDoCartao-opcao\" tabindex=\"0\">\n                    <svg>\n                        <use xlink:href=\"#iconeRemover\"></use>\n                    </svg>\n                </button>\n\n                <input type=\"radio\" name=\"corDoCartao" + contCartao + "\" value=\"#EBEF40\" id=\"corPadr\xE3o-cartao" + contCartao + "\" class=\"opcoesDoCartao-radioTipo\" checked>\n                <label for=\"corPadr\xE3o-cartao" + contCartao + "\" class=\"opcoesDoCartao-tipo opcoesDoCartao-opcao\" style=\"color: #EBEF40;\" tabindex=\"0\">\n                    Padr\xE3o\n                </label>\n\n                <input type=\"radio\" name=\"corDoCartao" + contCartao + "\" value=\"#F05450\" id=\"corImportante-cartao" + contCartao + "\" class=\"opcoesDoCartao-radioTipo\">\n                <label for=\"corImportante-cartao" + contCartao + "\" class=\"opcoesDoCartao-tipo opcoesDoCartao-opcao\" style=\"color: #F05450;\" tabindex=\"0\">\n                    Importante\n                </label>\n\n                <input type=\"radio\" name=\"corDoCartao" + contCartao + "\" value=\"#92C4EC\" id=\"corTarefa-cartao" + contCartao + "\" class=\"opcoesDoCartao-radioTipo\">\n                <label for=\"corTarefa-cartao" + contCartao + "\" class=\"opcoesDoCartao-tipo opcoesDoCartao-opcao\" style=\"color: #92C4EC;\" tabindex=\"0\">\n                    Tarefa\n                </label>\n\n                <input type=\"radio\" name=\"corDoCartao" + contCartao + "\" value=\"#76EF40\" id=\"corInspira\xE7\xE3o-cartao" + contCartao + "\" class=\"opcoesDoCartao-radioTipo\">\n                <label for=\"corInspira\xE7\xE3o-cartao" + contCartao + "\" class=\"opcoesDoCartao-tipo opcoesDoCartao-opcao\" style=\"color: #76EF40;\" tabindex=\"0\">\n                    Inspira\xE7\xE3o\n                </label>\n            </div>\n\n            <p class=\"cartao-conteudo\" contenteditable tabindex=\"0\">" + objCartao.conteudo + "</p>\n        </article>\n    ";
    mural.insertAdjacentHTML(posicaoCartao, cartao);

    var cartaoElemento = document.querySelector("#cartao_" + contCartao);
    cartaoElemento.style.background = objCartao.cor;
    //    alterarCor(elementoSelecionado, cartaoElemento);

    cartaoElemento.addEventListener("focusin", function () {
        cartaoElemento.classList.add("cartao--focado");
    });

    cartaoElemento.addEventListener("focusout", function () {
        cartaoElemento.classList.remove("cartao--focado");
    });

    cartaoElemento.addEventListener("click", function (event) {
        var elementoSelecionado = event.target;

        if (elementoSelecionado.classList.contains("opcoesDoCartao-opcao")) {
            alterarCor(elementoSelecionado, cartaoElemento);
        }

        if (elementoSelecionado.classList.contains("opcoesDoCartao-remove")) {
            removerCartao(elementoSelecionado);
        }
    });

    cartaoElemento.addEventListener("keyup", function (event) {
        // keyCode=13 => enter
        // keyCode=32 => espaço

        if (event.keyCode == 13 || event.keyCode == 32) {
            event.target.click();
        }
    });

    contCartao++;
}

function alterarCor(elementoSelecionado, cartao) {
    var corSelecionada = elementoSelecionado.style.color;

    cartao.style.background = corSelecionada;
    // cartao.setAttribute("style", "background: " + corSelecionada);
}

function removerCartao(elementoSelecionado) {
    var pai = elementoSelecionado.parentNode.parentNode;

    pai.classList.add("cartao--some");
    pai.addEventListener("transitionend", function () {
        pai.remove();
    });
}

(function () {
    $.ajax({
        url: "http://ceep.herokuapp.com/cartoes/carregar",
        method: "GET",
        data: { usuario: "juliane.sansil" },
        dataType: "jsonp",
        success: function success(resposta) {
            var cartoes = resposta.cartoes;
            cartoes.forEach(function (cartao) {
                criarCartao(cartao);
            });
        }
    });
})();