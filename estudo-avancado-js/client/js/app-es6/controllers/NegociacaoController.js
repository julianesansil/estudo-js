
import {Negociacao} from "../models/Negociacao";
import {ListaNegociacoes} from "../models/ListaNegociacoes";
import {Mensagem} from "../models/Mensagem";

import {NegociacaoService} from "../services/NegociacaoService";
import {NegociacoesView} from "../views/NegociacoesView";
import {MensagemView} from "../views/MensagemView";

import {DataHelper} from "../helpers/DataHelper";
import {Bind} from "../helpers/Bind";


class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._form = $(".form");
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#tabelaNegociacao")), "adicionar", "apagarTodos", "ordenar", "inverterOrdem");
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagem")), "texto");

        // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ["adicionar", "apagarTodos"],
        //     (model) => {

        //         this._negociacoesView.atualizar(model)
        //     }
        // );

        this._ordemAtual = "";
        this._service = new NegociacaoService();

        this._init();
    }

    _init() {

        this._service.listarTodos()
            .then((negociacoes) => {

                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)
                );
            })
            .catch(error => this._mensagem.texto = error);

        setInterval(() => {
            this.importar();
        }, 3000);
    }

    adicionar(event) {

        event.preventDefault();
        let negociacao = this._criarNegociacao();

        this._service.adicionar(negociacao)
            .then((mensagem) => {

                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = mensagem;
                this._limparFormulario();
            })
            .catch(error => this._mensagem.texto = error);
    }

    apagarTodos() {

        this._service.apagarTodos()
            .then((mensagem) => {

                this._listaNegociacoes.apagarTodos();
                this._mensagem.texto = mensagem;
            })
            .catch(error => this._mensagem.texto = error);
    }

    importar() {

        this._service.importar(this._listaNegociacoes.negociacoes)
            .then((negociacoes) => {

                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)
                );

                // this._mensagem.texto = "Negociações importadas com sucesso. o//"
            })
            .catch(error => this._mensagem.texto = error);
    }

    ordenar(coluna) {

        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverterOrdem();
        } else {
            this._listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }

    _criarNegociacao() {

        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limparFormulario() {

        this._form.reset();
        this._inputData.focus();
    }

}

let negociacaoCtrl = new NegociacaoController();

export function currentNegociacaoCtrl() {

    return negociacaoCtrl;
}