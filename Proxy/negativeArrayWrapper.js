'use strict';
function negativeArrayWrapper(array) {
    if (!(array instanceof Array)) {
        return array;
    }

    return new Proxy(array, {
        get(target, prop, receiver) {
            if (prop < 0) {
                prop = +prop + target.length;
            }

            return Reflect.get(target, prop, receiver);
        }
    });
};