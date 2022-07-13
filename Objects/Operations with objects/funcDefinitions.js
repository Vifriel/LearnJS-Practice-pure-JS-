//Exercises from https://learn.javascript.ru/object-methods
"use strict";

function Calculator(){
    this.firstOperand;
    this.secondOperand;
    this.read = function(){
        this.firstOperand = prompt("Enter the first operand");
        this.secondOperand = prompt("Enter the second operand");
    };
    this.sum = function(){
        return Number(this.firstOperand) + Number(this.secondOperand);
    };
    this.mul = function(){
        return this.firstOperand * this.secondOperand;
    };
};

function Ladder() {
    this.step = 0,
    this.up = function() {
      this.step++;
      return this;
    },
    this.down = function() {
      this.step--;
      return this;
    },
    this.showStep = function() { // shows current step
      alert( this.step );
    }
};