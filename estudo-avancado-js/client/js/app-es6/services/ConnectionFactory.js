
//Module Pattern
// var ConnectionFactory = (function () {

const db = "frame";
const version = 1;
const stores = ["negociacoes"];

let connection = undefined;
let close = undefined;

export class ConnectionFactory {

    constructor() {

        throw new Error("Não é possível criar instâncias de ConnectionFactory.");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(db, version);

            openRequest.onupgradeneeded = event => {

                console.log("Cria ou altera um banco já existente.");
                ConnectionFactory._createStores(event.target.result);
            };

            openRequest.onsuccess = event => {

                console.log("Conexão obtida com sucesso.");

                if (!connection) {
                    connection = event.target.result;

                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error("Você não pode fechar diretamente a conexão.");
                    }
                }
                resolve(connection);
            };

            openRequest.onerror = event => {

                console.log(event.target.error);
                reject(event.target.error.name);
            };
        });
    }

    static _createStores(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {

        if (connection) {
            close();
            connection = undefined;
        }
    }

}

// })();
