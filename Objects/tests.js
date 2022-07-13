describe('Function isEmpty(obj) returns', () => {
    it('false for object that includes any properties', () => {
        let obj = {
            prop1: undefined
        };
        assert.equal(isEmpty(obj), false);
    });

    it('true for object that does not includes any properties', () => {
        let obj = {};
        assert.equal(isEmpty(obj), true);
    });
});

describe('Function sum(obj) returns ', () => {
    it('sum of number representations of all object properties', () => {
        let salaries = {
            John: 100,
            Ann: 160,
            Pete: 130
        };
        assert.equal(sum(salaries), 390);
    });
    it('NaN, if one of object properties is NaN', () => {
        let NaNTestData = {
            John: 100,
            TextProp: "i'm here",
            Pete: 130
        };
        assert.isNaN(sum(NaNTestData));
    });
    it('0, if object has no properties', () => {
        let emptyObj = {};
        assert.equal(sum(emptyObj), 0);
    });
});

describe('Function multiplyNumeric(obj) ', () => {
    it('doubles all numeric properties in the target object', () => {
        let menu = {
            width: 200,
            height: 300,
            title: "My menu"
          };

        multiplyNumeric(menu);

        assert.equal(menu.width, 400);
        assert.equal(menu.height, 600);
    });

    it('does nothing with all other properties', () => {
        let noNumericObj = {
            prop1: "adawd",
            prop2: undefined,
            prop3: null
        };

        let tempCopy = {...noNumericObj};

        multiplyNumeric(noNumericObj);

        assert.deepEqual(noNumericObj, tempCopy);
    });
});