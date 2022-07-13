describe('camelize(str) tests', () => {
    it('returns null if str is not a string', () => {
        expect(camelize(123)).to.be.null;
        expect(camelize(null)).to.be.null;
        expect(camelize(undefined)).to.be.null;
        expect(camelize({})).to.be.null;
        expect(camelize([])).to.be.null;
    });
    it('returns string if str is a string', () => {
        expect(camelize("123")).to.be.a("string");
    });
    it('returns string that equals to str without hyphens and with upper-cased initial letters for each word in the str after first', () => {
        assert.equal(camelize("----do-you-have-any-questions--"), "doYouHaveAnyQuestions");
        assert.equal(camelize("do-you-do--"), "doYouDo");
        assert.equal(camelize("123"), "123");
        assert.equal(camelize("-not-today"), "notToday");
        assert.equal(camelize("----"), "----");
        assert.equal(camelize("---234---"), "---234---");
        assert.equal(camelize("---what-does-he---do-"), "whatDoesHeDo");
        assert.equal(camelize("---1---1---1-"), "111");
    });
});

describe('filterRange(arr, a, b) tests', () => {
    it('if a or b are not valid numbers returns null', () => {
        let arrVar = [1, 2 ,3];
        expect(filterRange(arrVar, NaN, 5)).to.be.null;
        expect(filterRange(arrVar, {}, 5)).to.be.null;
        expect(filterRange(arrVar, "awd", 5)).to.be.null;
        expect(filterRange(arrVar, [1, 2], 5)).to.be.null;
        expect(filterRange(arrVar, undefined, 5)).to.be.null;
        expect(filterRange(arrVar, 5, NaN)).to.be.null;
        expect(filterRange(arrVar, 5, {})).to.be.null;
        expect(filterRange(arrVar, 5, "awd")).to.be.null;
        expect(filterRange(arrVar, 5, [2, 1])).to.be.null;
        expect(filterRange(arrVar, 5, undefined)).to.be.null;
    });
    it('if arr is not an array returns null', () => {
        expect(filterRange(123, 1, 5)).to.be.null;
        expect(filterRange("sefsefsef", 1, 5)).to.be.null;
        expect(filterRange({}, 1, 5)).to.be.null;
        expect(filterRange(NaN, 1, 5)).to.be.null;
        expect(filterRange(null, 1, 5)).to.be.null;
        expect(filterRange(undefined, 1, 5)).to.be.null;
    });
    it('returns new array of all digits between a and b in arr (including limits)', () => {
        let arrVar = [-11 ,1 ,6 ,-13 ,13 ,-1 ,-5 ,13 ,0 ,-8 ,-5 ,10 ,6 ,-7 ,4 ,-2 ,-6 ,14 ,0 ,11 ,15 ,13 ,-9 ,1 ,-3 ,0 ,-6 ,11 ,-8 ,2];
        assert.deepEqual(filterRange(arrVar, -15, 15), arrVar);
        assert.deepEqual(filterRange(arrVar, 0, 15), [1, 6, 13, 13, 0, 10, 6, 4, 14, 0, 11, 15, 13, 1, 0, 11, 2]);
        assert.deepEqual(filterRange(arrVar, -15, 0), [-11, -13, -1, -5, 0, -8, -5, -7, -2, -6, 0, -9, -3, 0, -6, -8]);
        assert.deepEqual(filterRange(arrVar, 15, -15), arrVar);
        assert.deepEqual(filterRange(arrVar, 0, -15), [-11, -13, -1, -5, 0, -8, -5, -7, -2, -6, 0, -9, -3, 0, -6, -8]);
        assert.deepEqual(filterRange(arrVar, 15, 0), [1, 6, 13, 13, 0, 10,6, 4, 14, 0, 11, 15, 13, 1, 0, 11, 2]);
        assert.deepEqual(filterRange(arrVar, 4, 0), [1, 0, 4, 0, 1, 0, 2]);
        assert.deepEqual(filterRange(arrVar, -4, 0), [ -1, 0, -2, 0, -3, 0]);
    });
    it('ignores all non-digital values in arr (null and an empty array automaticly converts to 0)', () => {
        let arrVar = ["awdawd", NaN, 1, "ursygfuyf", 4, 5, null, [], 3];
        assert.deepEqual(filterRange(arrVar, 0, 4), [ 1, 4, 0, 0, 3]);
        assert.deepEqual(filterRange(arrVar, 1, 4), [ 1, 4, 3]);
    });
});

describe('filterRangeInPlace(arr, a, b) tests', () => {
    it('if a or b are not valid numbers does nothing', () => {
        let arrVar = [1, 2 ,3];
        let tempEqual = arrVar.slice();
        filterRangeInPlace(arrVar, NaN, 5);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, {}, 5);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, "awd", 5);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, [1, 2], 5);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, undefined, 5);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, 5, NaN);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, 5, {});
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, 5, "awd");
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, 5, [2, 1]);
        assert.deepEqual(arrVar, tempEqual);
        filterRangeInPlace(arrVar, 5, undefined);
        assert.deepEqual(arrVar, tempEqual);
    });
    it('if arr is not an array function does nothing', () => {
        let fakeArray = 123;
        let tempFakeArray = fakeArray;
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);

        fakeArray = "sefsefsef";
        tempFakeArray = fakeArray;
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);

        fakeArray = {};
        tempFakeArray = {...fakeArray};
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);

        fakeArray = NaN;
        tempFakeArray = fakeArray;
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);

        fakeArray = null;
        tempFakeArray = fakeArray;
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);

        fakeArray = undefined;
        tempFakeArray = fakeArray;
        filterRangeInPlace(fakeArray, 1, 5);
        assert.deepEqual(fakeArray, tempFakeArray);
    });

    it('changes arr, removing all items except digits between a and b in arr (including limits)', () => {
        let arrVar = [-11 ,1 ,6 ,-13 ,13 ,-1 ,-5 ,13 ,0 ,-8 ,-5 ,10 ,6 ,-7 ,4 ,-2 ,-6 ,14 ,0 ,11 ,15 ,13 ,-9 ,1 ,-3 ,0 ,-6 ,11 ,-8 ,2];
        let tempArrVar = arrVar.slice();

        filterRangeInPlace(arrVar, -15, 15);
        assert.deepEqual(tempArrVar, arrVar);

        filterRangeInPlace(arrVar, 0, 15);
        assert.deepEqual(arrVar, [1, 6, 13, 13, 0, 10, 6, 4, 14, 0, 11, 15, 13, 1, 0, 11, 2]);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, -15, 0);
        assert.deepEqual(arrVar, [-11, -13, -1, -5, 0, -8, -5, -7, -2, -6, 0, -9, -3, 0, -6, -8]);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, 15, -15);
        assert.deepEqual(tempArrVar, arrVar);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, 0, -15);
        assert.deepEqual(arrVar, [-11, -13, -1, -5, 0, -8, -5, -7, -2, -6, 0, -9, -3, 0, -6, -8]);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, 15, 0);
        assert.deepEqual(arrVar, [1, 6, 13, 13, 0, 10,6, 4, 14, 0, 11, 15, 13, 1, 0, 11, 2]);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, 4, 0);
        assert.deepEqual(arrVar, [1, 0, 4, 0, 1, 0, 2]);
        arrVar = tempArrVar.slice();

        filterRangeInPlace(arrVar, -4, 0);
        assert.deepEqual(arrVar, [ -1, 0, -2, 0, -3, 0]);
    });
});

describe('copySorted(arr) tests', () => {
    it('if arr is not an array returns null', () => {
        assert.strictEqual(copySorted(123), null);
        assert.strictEqual(copySorted("sefsefsef"), null);
        assert.strictEqual(copySorted({}), null);
        assert.strictEqual(copySorted(NaN), null);
        assert.strictEqual(copySorted(null), null);
        assert.strictEqual(copySorted(undefined), null);
    });
    it('if arr contains everithing except strings returns null', () => {
        const arr1 = ["123123", "ikufgeuyfgeuyf", "srgrg", 123];
        const arr2 = ["sefefe", NaN, "trhrgtg"];
        const arr3 = ["adawdwd", null, "rhrtg", "tfjytyh"];
        const arr4 = ["dthythy", undefined];
        const arr5 = ["ujtyjtj", {}];
        const arr6 = ["udyfgvy", []];

        expect(copySorted(arr1)).to.be.null;
        expect(copySorted(arr2)).to.be.null;
        expect(copySorted(arr3)).to.be.null;
        expect(copySorted(arr4)).to.be.null;
        expect(copySorted(arr5)).to.be.null;
        expect(copySorted(arr6)).to.be.null;
    });
    it('Otherwise returns a new array is equal to standart sorted arr', () => {
        let array = ["For", "in", "much", "wisdom", "is", "much", "grief", "and", "he", "that", "increaseth", "knowledge", "increaseth", "sorrow"];
        const tempArray = array.slice();

        assert.deepEqual(copySorted(array), ["For","and","grief","he","in","increaseth","increaseth","is","knowledge","much","much","sorrow","that","wisdom"]);
        assert.deepEqual(array, tempArray);
    });
});

describe('Calculator object tests', () => {
    let flexCalc;
    let funcToAdd = (a, b) => Math.hypot(a, b);
    before(() => {
        flexCalc = new Calculator;
    });
    it('new object must have following initialized fields: addMethod, methods, calculate', () => {
        expect(flexCalc).to.have.property("addMethod");
        expect(flexCalc).to.have.property("calculate");    
    });
    it('methods property must have properties "-" and "+"', () => {
        expect(flexCalc.methods).to.have.property("+");
        expect(flexCalc.methods).to.have.property("-");
    });
    it('addMethod(name, func) adds name as field name and func as function to execute on the call to methods', () => {
        expect(flexCalc.methods).to.not.have.property("#");
        flexCalc.addMethod("#", funcToAdd);
        expect(flexCalc.methods).to.have.property("#");
    });
    it('calculate(str) returns null if input is not a string with correct format "number operator number".', () => {
        expect(flexCalc.calculate(123)).to.be.null;
        expect(flexCalc.calculate("rggrf")).to.be.null;
    });
    describe('calculate(str) parses str and', () => {
        it('returns null if property does not defined in this.methods', () => {
            expect(flexCalc.calculate("123 & 321")).to.be.null;
        });
        it('otherwise returns the result of the invoked operation', () => {
            assert.strictEqual(flexCalc.calculate("3 # 4"), 5);
            assert.strictEqual(flexCalc.calculate("3 # 4"), funcToAdd(3, 4));
            assert.strictEqual(flexCalc.calculate("3 + 4"), 7);
            assert.strictEqual(flexCalc.calculate("3 - 4"), -1);
        });
    });
});

describe('sortByAge(users) tests', () => {
    it('if users is not an array does nothing with argument and returns null', () => {
        let fakeArr = 123;
        let tempFakeArr = fakeArr;
        sortByAge(fakeArr);
        assert.deepEqual(fakeArr, tempFakeArr);
        expect(sortByAge(fakeArr)).to.be.null;

        fakeArr = "awdawd";
        tempFakeArr = fakeArr;
        sortByAge(fakeArr);
        assert.deepEqual(fakeArr, tempFakeArr);
        expect(sortByAge(fakeArr)).to.be.null;

        fakeArr = {prop1: "someValue"};
        tempFakeArr = {...fakeArr};
        sortByAge(fakeArr);
        assert.deepEqual(fakeArr, tempFakeArr);
        expect(sortByAge(fakeArr)).to.be.null;

        fakeArr = null;
        tempFakeArr = fakeArr;
        sortByAge(fakeArr);
        assert.deepEqual(fakeArr, tempFakeArr);
        expect(sortByAge(fakeArr)).to.be.null;

        fakeArr = undefined;
        tempFakeArr = fakeArr;
        sortByAge(fakeArr);
        assert.deepEqual(fakeArr, tempFakeArr);
        expect(sortByAge(fakeArr)).to.be.null;
    });

    it('sorts users by age item\'s property in place. Also returns sorted array. ', () => {
        let usersArr = [{name: "John", age: 26}, {name: "Taras", age: 34}, {name: "Max", age: 23}, {name: "Jane", age: 19}];
        assert.deepEqual(sortByAge(usersArr), usersArr);
        assert.deepEqual(usersArr, [{name: "Jane", age: 19}, {name: "Max", age: 23},{name: "John", age: 26}, {name: "Taras", age: 34}]);
        let usersArr2 = ["adwwdawd", {name: "Taras", age: 34}, {}, {name: "Josh"}, {name: "Max", age: 23}];
        let tempArr = [...usersArr2];
        assert.deepEqual(sortByAge(usersArr2), tempArr);
    });
});

describe('unique(arr) tests', () => {
    it('if arr is not an array returns null', () => {
        let fakeArr = 123;
        let tempFakeArr = fakeArr;
        expect(unique(fakeArr)).to.be.null;

        fakeArr = "awdawd";
        tempFakeArr = fakeArr;
        expect(unique(fakeArr)).to.be.null;

        fakeArr = {prop1: "someValue"};
        tempFakeArr = {...fakeArr};
        expect(unique(fakeArr)).to.be.null;

        fakeArr = null;
        tempFakeArr = fakeArr;
        expect(unique(fakeArr)).to.be.null;

        fakeArr = undefined;
        tempFakeArr = fakeArr;
        expect(unique(fakeArr)).to.be.null;
    });
    it('Otherwise returns a new array with unique items from arr', () => {
        const initialArray = [12, 3, 5, -3, 8, -13, -15, 2, 7, -11, 1, -3, 10, -11, 6, 15, -8, 0, -10, -11, 9, -6, 1, -12, 15, 8, 3, -3, 10, -15];
        assert.notEqual(unique(initialArray), initialArray);
        assert.deepEqual(unique(initialArray), [12, 3, 5, -3, 8, -13, -15, 2, 7, -11, 1, 10, 6, 15, -8, 0, -10, 9, -6, -12]);
    });
});