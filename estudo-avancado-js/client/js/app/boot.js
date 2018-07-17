"use strict";

System.register(["./controllers/NegociacaoController"], function (_export, _context) {
  "use strict";

  var currentNegociacaoCtrl, negociacaoCtrl;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentNegociacaoCtrl = _controllersNegociacaoController.currentNegociacaoCtrl;
    }],
    execute: function () {
      negociacaoCtrl = currentNegociacaoCtrl();


      document.querySelector(".form").addEventListener("submit", negociacaoCtrl.adicionar.bind(negociacaoCtrl));
      document.querySelector("[type=button]").addEventListener("click", negociacaoCtrl.apagarTodos.bind(negociacaoCtrl));
    }
  };
});
//# sourceMappingURL=boot.js.map