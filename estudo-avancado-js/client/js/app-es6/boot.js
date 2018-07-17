
import { currentNegociacaoCtrl } from "./controllers/NegociacaoController";

let negociacaoCtrl = currentNegociacaoCtrl();

document.querySelector(".form").addEventListener("submit", negociacaoCtrl.adicionar.bind(negociacaoCtrl));
document.querySelector("[type=button]").addEventListener("click", negociacaoCtrl.apagarTodos.bind(negociacaoCtrl));
