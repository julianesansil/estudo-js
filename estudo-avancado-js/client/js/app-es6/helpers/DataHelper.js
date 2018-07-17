
export class DataHelper {

    constructor() {

        throw new Error("Esta classe não pode ser instanciada.");
    }

    static textoParaData(texto) {
        
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
            throw Error("Deve estar no padrão yyyy-MM-dd");
        }

        return texto.split("-");
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

}