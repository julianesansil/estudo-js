"use strict";

System.register(["../models/Negociacao"], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegocicacaoDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegocicacaoDAO", NegocicacaoDAO = function () {
                function NegocicacaoDAO(connection) {
                    _classCallCheck(this, NegocicacaoDAO);

                    this._connection = connection;
                    this._store = "negociacoes";
                }

                _createClass(NegocicacaoDAO, [{
                    key: "adicionar",
                    value: function adicionar(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (event) {

                                console.log("Negociação adicionada com sucesso no banco! o//");
                                resolve();
                            };

                            request.onerror = function (event) {

                                console.log(event.target.error);
                                reject(event.target.error.name);
                            };
                        });
                    }
                }, {
                    key: "listarTodos",
                    value: function listarTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var negociacoes = [];

                            var openCursor = _this2._connection.transaction(_this2._store).objectStore(_this2._store).openCursor();

                            openCursor.onsuccess = function (event) {
                                var cursor = event.target.result;

                                if (cursor) {

                                    var dado = cursor.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                                    cursor.continue();
                                } else {

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
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();

                            request.onsuccess = function (event) {

                                console.log("Negociações removidas com sucesso. :)");
                                resolve();
                            };

                            request.onerror = function (event) {

                                console.log(event.target.error);
                                reject(event.target.error.name);
                            };
                        });
                    }
                }]);

                return NegocicacaoDAO;
            }());

            _export("NegocicacaoDAO", NegocicacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDAO.js.map