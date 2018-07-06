
class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._form = $(".form");
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        
        this._pMensagem = $("#mensagem");
        this._tabelaNegociacao = $("#tabelaNegociacao");

        this._listaNegociacoes = new ListaNegociacoes();        
        this._negociacoesView = new NegociacoesView(this._tabelaNegociacao);
        this._negociacoesView.atualizar(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView(this._pMensagem);
    }

    adicionar(event) {

        event.preventDefault();

        let negociacao = new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        this._listaNegociacoes.adicionar(negociacao);
        this._negociacoesView.atualizar(this._listaNegociacoes);

        this._mensagem.texto = "Negociação adicionada com sucesso! :)"
        this._mensagemView.atualizar(this._mensagem);
        
        this._limparFormulario();
    }

    _limparFormulario() {

        this._form.reset();
        this._inputData.focus();
    }

}
