
import {ConnectionFactory} from "./ConnectionFactory";
import {HttpService} from "./HttpService";

import {Negociacao} from "../models/Negociacao";
import {NegocicacaoDAO} from "../dao/NegociacaoDAO";

export class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    getNegociacoes() {

        return Promise.all([
            this.getNegociacoesSemana(),
            this.getNegociacoesSemanaAnterior(),
            this.getNegociacoesSemanaRetrasada()
        ])
            .then(response => {

                let negociacoes = response.reduce((arrayNegociacoes, array) => arrayNegociacoes.concat(array));
                return negociacoes;
            })
            .catch(error => {

                throw error;
            });
    }

    getNegociacoesSemana() {

        return this._http.get("negociacoes/semana")
            .then(negociacoes => {

                return negociacoes.map(objeto =>
                    new Negociacao(objeto.data, objeto.quantidade, objeto.valor)
                );
            })
            .catch(error => {

                throw new Error("Não foi possível obter as negociações da semana.");
            });
    }

    getNegociacoesSemanaAnterior() {

        return this._http.get("negociacoes/anterior")
            .then(negociacoes => {

                return negociacoes.map(objeto =>
                    new Negociacao(objeto.data, objeto.quantidade, objeto.valor)
                );
            })
            .catch(error => {

                throw new Error("Não foi possível obter as negociações da semana anterior.");
            });
    }

    getNegociacoesSemanaRetrasada() {

        return this._http.get("negociacoes/retrasada")
            .then(negociacoes => {

                return negociacoes.map(objeto =>
                    new Negociacao(objeto.data, objeto.quantidade, objeto.valor)
                );
            })
            .catch(error => {

                throw new Error("Não foi possível obter as negociações da semana retrasada.");
            });
    }

    adicionar(negociacao) {

        return ConnectionFactory.getConnection()
            .then(connection => new NegocicacaoDAO(connection))
            .then(negociacaoDAO => negociacaoDAO.adicionar(negociacao))
            .then(() => "Negociação adicionada com sucesso! ;)")
            .catch(error => {
                throw new Error("Não foi possível adicionar uma negociação. :(");
            });
    }

    listarTodos() {

        return ConnectionFactory.getConnection()
            .then(connection => new NegocicacaoDAO(connection))
            .then(negociacaoDAO => negociacaoDAO.listarTodos())
            .catch(error => {
                throw new Error("Não foi possível listar as negociações. :(");
            });
    }

    apagarTodos(negociacao) {

        return ConnectionFactory.getConnection()
            .then(connection => new NegocicacaoDAO(connection))
            .then(negociacaoDAO => negociacaoDAO.apagarTodos(negociacao))
            .then(() => "Negociações apagadas com sucesso... :)")
            .catch(error => {
                throw new Error("Não foi possível apagar as negociações. :(");
            });
    }

    importar(listaAtual) {

        return this.getNegociacoes()
            .then(negociacoes =>

                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)
                    )
                )
            )
            .catch(error => {

                throw new Error("Não foi possível importar as negociações. :o");
            });
    }
    
}
