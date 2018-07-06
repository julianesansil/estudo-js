
class MensagemView extends View {

    constructor(elemento) {
        
        super(elemento);
    }

    template(mensagem) {

        return `<p class="alert alert-info">${mensagem.texto}</p>`
    }

}