"use strict";

System.register(["./ConnectionFactory", "./HttpService", "../models/Negociacao", "../dao/NegociacaoDAO"], function (_export, _context) {
    "use strict";

    var ConnectionFactory, HttpService, Negociacao, NegocicacaoDAO, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDAO) {
            NegocicacaoDAO = _daoNegociacaoDAO.NegocicacaoDAO;
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

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "getNegociacoes",
                    value: function getNegociacoes() {

                        return Promise.all([this.getNegociacoesSemana(), this.getNegociacoesSemanaAnterior(), this.getNegociacoesSemanaRetrasada()]).then(function (response) {

                            var negociacoes = response.reduce(function (arrayNegociacoes, array) {
                                return arrayNegociacoes.concat(array);
                            });
                            return negociacoes;
                        }).catch(function (error) {

                            throw error;
                        });
                    }
                }, {
                    key: "getNegociacoesSemana",
                    value: function getNegociacoesSemana() {

                        return this._http.get("negociacoes/semana").then(function (negociacoes) {

                            return negociacoes.map(function (objeto) {
                                return new Negociacao(objeto.data, objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {

                            throw new Error("Não foi possível obter as negociações da semana.");
                        });
                    }
                }, {
                    key: "getNegociacoesSemanaAnterior",
                    value: function getNegociacoesSemanaAnterior() {

                        return this._http.get("negociacoes/anterior").then(function (negociacoes) {

                            return negociacoes.map(function (objeto) {
                                return new Negociacao(objeto.data, objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {

                            throw new Error("Não foi possível obter as negociações da semana anterior.");
                        });
                    }
                }, {
                    key: "getNegociacoesSemanaRetrasada",
                    value: function getNegociacoesSemanaRetrasada() {

                        return this._http.get("negociacoes/retrasada").then(function (negociacoes) {

                            return negociacoes.map(function (objeto) {
                                return new Negociacao(objeto.data, objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {

                            throw new Error("Não foi possível obter as negociações da semana retrasada.");
                        });
                    }
                }, {
                    key: "adicionar",
                    value: function adicionar(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegocicacaoDAO(connection);
                        }).then(function (negociacaoDAO) {
                            return negociacaoDAO.adicionar(negociacao);
                        }).then(function () {
                            return "Negociação adicionada com sucesso! ;)";
                        }).catch(function (error) {
                            throw new Error("Não foi possível adicionar uma negociação. :(");
                        });
                    }
                }, {
                    key: "listarTodos",
                    value: function listarTodos() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegocicacaoDAO(connection);
                        }).then(function (negociacaoDAO) {
                            return negociacaoDAO.listarTodos();
                        }).catch(function (error) {
                            throw new Error("Não foi possível listar as negociações. :(");
                        });
                    }
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegocicacaoDAO(connection);
                        }).then(function (negociacaoDAO) {
                            return negociacaoDAO.apagarTodos(negociacao);
                        }).then(function () {
                            return "Negociações apagadas com sucesso... :)";
                        }).catch(function (error) {
                            throw new Error("Não foi possível apagar as negociações. :(");
                        });
                    }
                }, {
                    key: "importar",
                    value: function importar(listaAtual) {

                        return this.getNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (error) {

                            throw new Error("Não foi possível importar as negociações. :o");
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map