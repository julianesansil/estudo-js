
class ProxyFactory {

    static create(model, props, armadilha) {

        return new Proxy(model, {

            get: function (target, prop, receiver) {

                if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {

                    return function () {

                        console.log(`A propriedade "${prop}" foi interceptada`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        armadilha(target);

                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set: function (target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    armadilha(target);
                }

                return retorno;
            }
        });
    }

}
