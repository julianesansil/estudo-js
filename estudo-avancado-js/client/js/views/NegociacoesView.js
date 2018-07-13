
class NegociacoesView extends View  {

    constructor(elemento) {

        super(elemento);
    }

    template(listaNegociacoes) {

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="negociacaoCtrl.ordenar('data')">DATA</th>
                        <th onclick="negociacaoCtrl.ordenar('quantidade')">QUANTIDADE</th>
                        <th onclick="negociacaoCtrl.ordenar('valor')">VALOR</th>
                        <th onclick="negociacaoCtrl.ordenar('volume')">VOLUME</th>
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
