
import {Negociacao} from "../models/Negociacao";

export class NegocicacaoDAO {

    constructor(connection) {

        this._connection = connection;
        this._store = "negociacoes";
    }

    adicionar(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = event => {

                console.log("Negociação adicionada com sucesso no banco! o//");
                resolve();
            };

            request.onerror = event => {

                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }

    listarTodos() {

        return new Promise((resolve, reject) => {

            let negociacoes = [];

            let openCursor = this._connection
                .transaction(this._store)
                .objectStore(this._store)
                .openCursor();

            openCursor.onsuccess = function (event) {
                let cursor = event.target.result;

                if (cursor) {

                    let dado = cursor.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    cursor.continue();
                }
                else {

                    console.log("Negociações do banco listadas com sucesso. ;)");
                    resolve(negociacoes);
                }
            };

            openCursor.onerror = function (event) {

                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }

    apagarTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .clear();

            request.onsuccess = event => {

                console.log("Negociações removidas com sucesso. :)");
                resolve();
            };

            request.onerror = event => {

                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }
}