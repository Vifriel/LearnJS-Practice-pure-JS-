//Exercises from https://learn.javascript.ru/native-prototypes
"use strict";
Function.prototype.defer = function (ms) {
    if (!isFinite(ms)) {
        return;
    }

    setTimeout(this, ms);
};

Function.prototype.deferWrap = function (ms) {
    
    if (!isFinite(ms)) {
        return function () {};
    }
    let func = this;

    return function wrapper(...args) {
        setTimeout(() => func.apply(this, args), ms);
    }
};

