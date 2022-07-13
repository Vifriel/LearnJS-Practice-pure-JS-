'use strict';
function makeObservable(target) {
    let handlers = Symbol('handlers');
    target[handlers] = [];

    target.observe = function (handler) {
        this[handlers].push(handler);
    };

    return new Proxy(target, {
        set(target, property, value, receiver) {
            let isSuccess = Reflect.set(...arguments);
            if (isSuccess) {
                target[handlers].forEach(handler => {
                    handler(property, value);
                });
            }
        }
    });
}