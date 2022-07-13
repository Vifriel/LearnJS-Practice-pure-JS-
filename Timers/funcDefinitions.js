//Exercises from https://learn.javascript.ru/settimeout-setinterval
"use strict";

function printNumbersTimeout(from, to) {
    if (!isFinite(from) || !isFinite(to)) {
        return;
    }

    if (from > to) return;

    printNumbersTimeout.count = from;

    let timerId = setTimeout(function printNum() {
        alert(printNumbersTimeout.count);
        if (printNumbersTimeout.count == to) {
            return;
        }
        else {
            timerId = setTimeout(printNum, 1000);
            printNumbersTimeout.count++;
        }
    }, 1000);    
};

function printNumbersInterval(from, to) {
    if (!isFinite(from) || !isFinite(to)) {
        return;
    }

    if (from > to) return;

    printNumbersTimeout.count = from;

    let timerId = setInterval(() => {
        alert(printNumbersTimeout.count);
        if (printNumbersTimeout.count == to) {
            clearInterval(timerId);
        }
        printNumbersTimeout.count++;
    }, 1000);
};