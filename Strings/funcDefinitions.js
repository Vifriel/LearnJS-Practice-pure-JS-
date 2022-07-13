"use strict";
function ucFirst(str) {
    if (typeof str === "string") {
        return str[0].toUpperCase() + str.substring(1);
    }

    return String(str);    
};

function checkSpam(str) {
    if (typeof str === "string") {
        return str.toLowerCase().includes('xxx') || str.toLowerCase().includes('viagra');
    }

    return false;
};

function truncate(str, maxlength) {
    if (typeof str === "string" && maxlength > 0) {
        if (str.length <= maxlength) {
            return str;
        }
        else
        {
            return str.substring(0, maxlength - 1) + '…';
        }
    }

    return null;
}

function extractCurrencyValue(str) {
    if (typeof str === "string") {
        let regExp = /^\$\d+?(\.\d+)?$/g;
        return (regExp.test(str)) ? Number(str.substring(1)) : null;
    };

    return null;
}