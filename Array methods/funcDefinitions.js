//Excercises from https://learn.javascript.ru/array-methods
"use strict";

function camelize(str) {
    if (typeof str != "string") {
        return null;
    }

    // remove all multiple hyphens as so hyphens before at the start and at the end of str
    let formattedStr  = str.replace(/-{2,}/g, '-').replace(/^-?(.*?)-?$/g, '$1'); 

    let wordsArray = formattedStr.split('-');

    if (formattedStr == '' || wordsArray[1] === undefined) {
        return str;
    }

    for (let index = 1; index < wordsArray.length; index++) {
        wordsArray[index] = wordsArray[index][0].toUpperCase() + wordsArray[index].substring(1) ?? '';
    }
    return wordsArray.join('');
};

function filterRange(arr, a, b) {
    if (!checkValidNumbers(a, b)) {
        return null;
    }
    if (!Array.isArray(arr)) {
        return null;
    }

    let orderedLimits = a > b ? [b, a] : [a, b];
    let resultArray = new Array();

    arr.forEach(element => {
        if (isFinite(element) && element >= orderedLimits[0] && element <= orderedLimits[1]) {
            resultArray.push(Number(element));
        }
    });

    return resultArray;
};

function checkValidNumbers(...params) {
    return params.every(isFinite);
};

function filterRangeInPlace(arr, a, b) {
    if (!checkValidNumbers(a, b)) {
        return;
    }
    if (!Array.isArray(arr)) {
        return;
    }

    let orderedLimits = a > b ? [b, a] : [a, b];

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        
        if (!isFinite(element) || element < orderedLimits[0] || element > orderedLimits[1]) {
            arr.splice(index, 1);
            index--;
        }
    }
};

function copySorted(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }

    if (!arr.every(item => typeof item == "string")) {
        return null;
    }
    
    return arr.slice().sort();
};

function Calculator() {
    this.methods = {
        "+": (a, b) =>  a + b,
        "-": (a, b) => a - b
    };

    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };

    this.calculate = function (str) {
        let parseRegExp = /^-?\d+ ([^\s]+) -?\d+$/g;
        if (!parseRegExp.test(str)) {
            return null;    
        }

        let splittedArguments = str.split(' ');

        let funcName = splittedArguments[1];
        
        if (this.methods[funcName] === undefined) {
            return null;            
        }

        return this.methods[funcName](Number(splittedArguments[0]), Number(splittedArguments[2]));
    };
};

function sortByAge(users) {
    if (!Array.isArray(users)) return null;

    return users.sort((item1, item2) => item1.age - item2.age);
};

function unique(arr) {
    if (!Array.isArray(arr)) return null;

    let resultArr = [];

    for (const value of arr) {
        if (!resultArr.includes(value)) {
            resultArr.push(value);
        }
    }

    return resultArr;
};