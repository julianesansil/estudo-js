
import {View} from "./View";

export class MensagemView extends View {

    constructor(elemento) {
        
        super(elemento);
    }

    template(mensagem) {

        if (mensagem.texto) {

            return `<p class="alert alert-info">${mensagem.texto}</p>`
        }

        return null;
    }

}