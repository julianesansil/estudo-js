
export class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = new Date(data);
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    get data() {

        return new Date(this._data);
    }

    get quantidade() {

        return this._quantidade;
    }

    get valor() {

        return this._valor;
    }

    get volume() {

        return this._quantidade * this._valor;
    }

    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}
