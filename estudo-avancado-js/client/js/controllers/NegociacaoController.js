
class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._form = $(".form");
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tabelaNegociacao")), "adicionar", "apagar", "ordenar", "inverterOrdem");
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagem")), "texto");

        // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ["adicionar", "apagar"],
        //     (model) => {

        //         this._negociacoesView.atualizar(model)
        //     }
        // );

        this._ordemAtual = "";
    }

    adicionar(event) {

        event.preventDefault();

        let negociacao = new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        this._listaNegociacoes.adicionar(negociacao);
        this._mensagem.texto = "Negociação adicionada com sucesso! ;)"
        this._limparFormulario();
    }

    apagar() {

        this._listaNegociacoes.apagar();
        this._mensagem.texto = "Negociações apagadas com sucesso... :)"
    }

    importarNegociacoes() {

        let service = new NegociacaoService();

        service.getNegociacoes()
            .then(negociacoes => {

                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)
                );

                this._mensagem.texto = "Negociações importadas com sucesso. o//"
            })
            .catch(error => {

                this._mensagem.texto = error;
            });
    }

    ordenar(coluna) {

        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverterOrdem();
        } else {
            this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }

    _limparFormulario() {

        this._form.reset();
        this._inputData.focus();
    }

}
