// Exercises from https://learn.javascript.ru/array
"use strict";
function sumInput() {
    let valuesArray = [];
    while (true) {
        let currentInput = prompt('Enter a number to calculate sum');
        if (currentInput === null || currentInput === "" || isNaN(currentInput)) {
            break;
        }
        valuesArray.push(+currentInput);
    };
    
    if (valuesArray.length == 0) {
        return null;
    };

    let result = 0;

    valuesArray.forEach(element => {
        result += element;
    });

    return result;
};

function getMaxSubSum(arr) {
    if ( !(arr instanceof Array)) {
        return null;
    };

    if (!arr.every(element => isFinite(element))) {
        return null;
    };

    let currentMaxSum = 0;
    let tempCurrentSum = 0;

    for (let index = 0; index <= arr.length; index++) {
        if (arr[index] >= 0) {
            tempCurrentSum += arr[index];
            if (tempCurrentSum > currentMaxSum) {
                currentMaxSum = tempCurrentSum;
            };
        }
        else {
            if (tempCurrentSum + arr[index] >= 0) {
                tempCurrentSum += arr[index];
            }
            else {
                tempCurrentSum = 0;
            };
        };
        console.log(index, tempCurrentSum);
    };

    return currentMaxSum;
};