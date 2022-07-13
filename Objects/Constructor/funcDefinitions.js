//Exerсise from https://learn.javascript.ru/constructor-new
"use strict";

function Accumulator(startingValue) {
    this.value = Number(startingValue);
    this.read = function() {
        this.value += Number(prompt("Enter value to accumulate."));
        return this;
    };
}