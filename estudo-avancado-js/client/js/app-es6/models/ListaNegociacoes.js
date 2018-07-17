
export class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];

        // this._contexto = contexto;
        // this._armadilha = armadilha;
    }

    get negociacoes() {

        return [].concat(this._negociacoes);
    }

    adicionar(negociacao) {

        this._negociacoes.push(negociacao);

        // this._armadilha(this);
        // Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    apagarTodos() {

        this._negociacoes = [];

        // this._armadilha(this);
        // Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    ordenar(criterio) {

        this._negociacoes.sort(criterio);
    }

    inverterOrdem() {

        this._negociacoes.reverse();
    }

}
