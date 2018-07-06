
class NegociacoesView extends View  {

    constructor(elemento) {

        super(elemento);
    }

    template(listaNegociacoes) {

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
                        `)
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
