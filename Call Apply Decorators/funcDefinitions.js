//Exercises from https://learn.javascript.ru/call-apply-decorators#perehodim-k-neskolkim-argumentam-s-func-apply
"use strict";

function paramsAdhesive(...params) {
    return JSON.stringify(params);
};

function simpleSpy(func) {
    if (!(func instanceof Function)) {
        throw new TypeError();
    }


    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    };

    wrapper.calls = [];

    return wrapper;
};

function delay(f, ms) {
    if (!(f instanceof Function) || !isFinite(ms)) {
        throw new TypeError();
    }

    return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
    };
};

function debounce(f, ms) {
    if (!(f instanceof Function) || !isFinite(ms)) {
        throw new TypeError();
    }

    function wrapper(...args) {
        let timeStamp = Date.now();
        if (wrapper.lastSuccessfulTime === undefined || wrapper.lastSuccessfulTime <= timeStamp - ms) {
            f.apply(this, args);
            wrapper.lastSuccessfulTime = timeStamp;
        }
    };

    wrapper.lastSuccessfulTime = undefined;

    return wrapper;
};

function throttle(f, ms) {
    if (!(f instanceof Function) || !isFinite(ms)) {
        throw new TypeError();
    }

    function wrapper(...args) {
        let timeStamp = Date.now();
        if (wrapper.lastSuccessfulTime === undefined || wrapper.lastSuccessfulTime <= timeStamp - ms) {
            f.apply(this, args);
            wrapper.lastSuccessfulTime = timeStamp;
            if (wrapper.timerIsSet) {
                clearTimeout(wrapper.currentTimer);
                wrapper.timerIsSet = false;
            }
        }
        else
        {
            clearTimeout(wrapper.currentTimer);
            wrapper.currentTimer = setTimeout(wrapper, ms - (timeStamp - wrapper.lastSuccessfulTime), ...args);
            wrapper.timerIsSet = true;
        }
    };

    wrapper.currentTimer;
    wrapper.timerIsSet = false;
    wrapper.lastSuccessfulTime = undefined;

    return wrapper;
};