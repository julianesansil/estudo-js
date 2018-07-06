let contCartao = 1;

function criarCartao(objCartao, posicaoCartao = 'afterbegin') {
    const mural = document.querySelector(".mural");

    let cartao = `
        <article id="cartao_${contCartao}" class="cartao" tabindex="0">
            <div class="opcoesDoCartao">
                <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                    <svg>
                        <use xlink:href="#iconeRemover"></use>
                    </svg>
                </button>

                <input type="radio" name="corDoCartao${contCartao}" value="#EBEF40" id="corPadrão-cartao${contCartao}" class="opcoesDoCartao-radioTipo" checked>
                <label for="corPadrão-cartao${contCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                    Padrão
                </label>

                <input type="radio" name="corDoCartao${contCartao}" value="#F05450" id="corImportante-cartao${contCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corImportante-cartao${contCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                    Importante
                </label>

                <input type="radio" name="corDoCartao${contCartao}" value="#92C4EC" id="corTarefa-cartao${contCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corTarefa-cartao${contCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                    Tarefa
                </label>

                <input type="radio" name="corDoCartao${contCartao}" value="#76EF40" id="corInspiração-cartao${contCartao}" class="opcoesDoCartao-radioTipo">
                <label for="corInspiração-cartao${contCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                    Inspiração
                </label>
            </div>

            <p class="cartao-conteudo" contenteditable tabindex="0">${objCartao.conteudo}</p>
        </article>
    `
    mural.insertAdjacentHTML(posicaoCartao, cartao);

    const cartaoElemento = document.querySelector(`#cartao_${contCartao}`);
    cartaoElemento.style.background = objCartao.cor;
//    alterarCor(elementoSelecionado, cartaoElemento);

    cartaoElemento.addEventListener("focusin", function () {
        cartaoElemento.classList.add("cartao--focado");
    })

    cartaoElemento.addEventListener("focusout", function () {
        cartaoElemento.classList.remove("cartao--focado");
    })

    cartaoElemento.addEventListener("click", function (event) {
        const elementoSelecionado = event.target;

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
    const corSelecionada = elementoSelecionado.style.color;

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

(function() {
    $.ajax({
        url: "http://ceep.herokuapp.com/cartoes/carregar",
        method: "GET",
        data: {usuario: "juliane.sansil"},
        dataType: "jsonp",
        success: function(resposta) {
            let cartoes = resposta.cartoes;
            cartoes.forEach(cartao => {
                criarCartao(cartao);
            });
        }
    });
})()