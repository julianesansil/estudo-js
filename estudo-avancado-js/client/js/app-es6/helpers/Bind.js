
import {ProxyFactory} from "../services/ProxyFactory";

export class Bind {

    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(model, props,
            (model) => {

                view.atualizar(model);
            }
        );

        view.atualizar(model)

        return proxy;
    }

}