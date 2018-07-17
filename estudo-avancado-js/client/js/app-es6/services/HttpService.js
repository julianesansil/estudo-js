
export class HttpService {

    // get(url) {
    //     return new Promise((resolve, reject) => {

    //         let xhr = new XMLHttpRequest();
    //         xhr.open("GET", url);

    //         xhr.onreadystatechange = () => {

    //             // STATUS
    //             // 0 = requisição ainda não iniciada;
    //             // 1 = conexão com o servidor estabelecida;
    //             // 2 = requisição recebida;
    //             // 3 = processando requisição;
    //             // 4 = requisição concluída e resposta pronta

    //             if (xhr.readyState == 4) {
    //                 if (xhr.status == 200) {

    //                     resolve(JSON.parse(xhr.responseText));
    //                 } else {

    //                     console.log(xhr.responseText);
    //                     reject(xhr.responseText);
    //                 }
    //             }
    //         };

    //         xhr.send();
    //     });
    // }

    // Com Fetch API
    get(url) {

        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());
    }

    _handleErrors(response) {

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    }

}
