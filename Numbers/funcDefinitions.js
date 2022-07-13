//Exercises from https://learn.javascript.ru/number
"use strict";
function readNumber(){
    do {
        var inputVal = prompt("Input a number");
    } while (inputVal !== null && inputVal.length !== 0 && isNaN(+inputVal));
    
    if (inputVal === null) {
        return null;
    }
    if (inputVal.length === 0) {
        return null;
    }

    return +inputVal;
};

function random(min, max) {
    if(!isFinite(min) || !isFinite(max)) {
        return NaN;
    }

    if (min === max) {
        return +min;
    }

    let result = Math.random();

    return result * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(random(min, max+1));
}