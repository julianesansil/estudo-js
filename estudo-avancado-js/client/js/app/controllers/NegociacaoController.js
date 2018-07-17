"use strict";

System.register(["../models/Negociacao", "../models/ListaNegociacoes", "../models/Mensagem", "../services/NegociacaoService", "../views/NegociacoesView", "../views/MensagemView", "../helpers/DataHelper", "../helpers/Bind"], function (_export, _context) {
    "use strict";

    var Negociacao, ListaNegociacoes, Mensagem, NegociacaoService, NegociacoesView, MensagemView, DataHelper, Bind, _createClass, NegociacaoController, negociacaoCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_helpersDataHelper) {
            DataHelper = _helpersDataHelper.DataHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

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

                _createClass(NegociacaoController, [{
                    key: "_init",
                    value: function _init() {
                        var _this = this;

                        this._service.listarTodos().then(function (negociacoes) {

                            negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adicionar(negociacao);
                            });
                        }).catch(function (error) {
                            return _this._mensagem.texto = error;
                        });

                        setInterval(function () {
                            _this.importar();
                        }, 3000);
                    }
                }, {
                    key: "adicionar",
                    value: function adicionar(event) {
                        var _this2 = this;

                        event.preventDefault();
                        var negociacao = this._criarNegociacao();

                        this._service.adicionar(negociacao).then(function (mensagem) {

                            _this2._listaNegociacoes.adicionar(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limparFormulario();
                        }).catch(function (error) {
                            return _this2._mensagem.texto = error;
                        });
                    }
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos() {
                        var _this3 = this;

                        this._service.apagarTodos().then(function (mensagem) {

                            _this3._listaNegociacoes.apagarTodos();
                            _this3._mensagem.texto = mensagem;
                        }).catch(function (error) {
                            return _this3._mensagem.texto = error;
                        });
                    }
                }, {
                    key: "importar",
                    value: function importar() {
                        var _this4 = this;

                        this._service.importar(this._listaNegociacoes.negociacoes).then(function (negociacoes) {

                            negociacoes.forEach(function (negociacao) {
                                return _this4._listaNegociacoes.adicionar(negociacao);
                            });

                            // this._mensagem.texto = "Negociações importadas com sucesso. o//"
                        }).catch(function (error) {
                            return _this4._mensagem.texto = error;
                        });
                    }
                }, {
                    key: "ordenar",
                    value: function ordenar(coluna) {

                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverterOrdem();
                        } else {
                            this._listaNegociacoes.ordenar(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }

                        this._ordemAtual = coluna;
                    }
                }, {
                    key: "_criarNegociacao",
                    value: function _criarNegociacao() {

                        return new Negociacao(DataHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: "_limparFormulario",
                    value: function _limparFormulario() {

                        this._form.reset();
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoCtrl = new NegociacaoController();
            function currentNegociacaoCtrl() {

                return negociacaoCtrl;
            }

            _export("currentNegociacaoCtrl", currentNegociacaoCtrl);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map