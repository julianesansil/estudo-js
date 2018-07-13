
class NegociacaoService {

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

}
