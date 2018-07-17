"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("ListaNegociacoes", ListaNegociacoes = function () {
                function ListaNegociacoes() {
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];

                    // this._contexto = contexto;
                    // this._armadilha = armadilha;
                }

                _createClass(ListaNegociacoes, [{
                    key: "adicionar",
                    value: function adicionar(negociacao) {

                        this._negociacoes.push(negociacao);

                        // this._armadilha(this);
                        // Reflect.apply(this._armadilha, this._contexto, [this]);
                    }
                }, {
                    key: "apagarTodos",
                    value: function apagarTodos() {

                        this._negociacoes = [];

                        // this._armadilha(this);
                        // Reflect.apply(this._armadilha, this._contexto, [this]);
                    }
                }, {
                    key: "ordenar",
                    value: function ordenar(criterio) {

                        this._negociacoes.sort(criterio);
                    }
                }, {
                    key: "inverterOrdem",
                    value: function inverterOrdem() {

                        this._negociacoes.reverse();
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {

                        return [].concat(this._negociacoes);
                    }
                }]);

                return ListaNegociacoes;
            }());

            _export("ListaNegociacoes", ListaNegociacoes);
        }
    };
});
//# sourceMappingURL=ListaNegociacoes.js.map