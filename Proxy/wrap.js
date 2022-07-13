'use strict';
function wrap(target) {
    return new Proxy(target, {
        get(target, prop, receiver){
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            }
            else {
                return 'Error: property does not exist';
            }
        }
    });
}