
import {View} from "./View";
import {DataHelper} from "../helpers/DataHelper";

import {currentNegociacaoCtrl} from "../controllers/NegociacaoController";


export class NegociacoesView extends View  {

    constructor(elemento) {

        super(elemento);

        elemento.addEventListener("click", function(event) {

            if (event.target.nodeName == "TH") {
                currentNegociacaoCtrl().ordenar(event.target.textContent.toLowerCase());
            }
        });
    }

    template(listaNegociacoes) {

        // let negociacaoCtrl = currentNegociacaoCtrl();
        
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${
                        listaNegociacoes.negociacoes.map(negociacao => `
                            <tr>
                                <td>${DataHelper.dataParaTexto(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                                <td>${negociacao.volume}</td>
                            </tr>
                        `).join("")
                    }
                </tbody>

                <tfoot>
                    <td colspan="3"></td>
                    <td>
                        ${
                            listaNegociacoes.negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0)
                        }
                    </td>
                </tfoot>
            </table>
        `;
    }

}
