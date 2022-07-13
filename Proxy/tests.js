//Excercises from https://learn.javascript.ru/proxy#tasks
describe('wrap(target) func tests', () => {
    let user;
    let errorMessage = 'Error: property does not exist';
    
    beforeEach(() => {
       user = {
        name: 'Vincent',
        age: 17
        }; 
    });

    it('Must return instance of another object', () => {
        let tempObj = wrap(user);
        assert.notStrictEqual(user, tempObj);
        expect(tempObj).to.not.be.undefined;
    });

    it('Must provide direct access to all existed in original object properties', () => {
        let wrappedUser = wrap(user);
        assert.strictEqual(wrappedUser.name, 'Vincent');
        assert.strictEqual(wrappedUser.age, 17);
    });

    it('Must return string error message \'Error: property does not exist\' instead of exception', () => {
        let wrappedUser = wrap(user);
        assert.strictEqual(wrappedUser.fakeProp1, errorMessage);
        assert.strictEqual(wrappedUser.fakeProp2, errorMessage);
    });
});

describe('negativeArrayWrapper(array) tests', () => {
    let arr;
        
    beforeEach(() => {
        arr = [1, 2, 3, 4, 5];
    });
    
    it('Must return param if param is not instance of Array', () => {
        let temp = {};
        assert.strictEqual(temp, negativeArrayWrapper(temp));
        temp = 123;
        assert.strictEqual(temp, negativeArrayWrapper(temp));
        temp = 'awdawd';
        assert.strictEqual(temp, negativeArrayWrapper(temp));
        temp = null;
        assert.strictEqual(temp, negativeArrayWrapper(temp));
        temp = undefined;
        assert.strictEqual(temp, negativeArrayWrapper(temp));
    });

    it('Otherwise must return instance of another object', () => {
        let tempObj = negativeArrayWrapper(arr);
        assert.notStrictEqual(arr, tempObj);
        expect(tempObj).to.not.be.undefined;
    });

    it('If array is Array must provide access by negative index (-1 equal last element in array, etc.)', () => {
        assert.strictEqual(negativeArrayWrapper(arr)[-1], 5);
        assert.strictEqual(negativeArrayWrapper(arr)[-2], 4);
        assert.strictEqual(negativeArrayWrapper(arr)[-3], 3);
        assert.strictEqual(negativeArrayWrapper(arr)[-4], 2);
        assert.strictEqual(negativeArrayWrapper(arr)[-5], 1);
    });

    it('Other array functionality must stay unmodified', () => {
        assert.strictEqual(negativeArrayWrapper(arr).push(6), 6);
    });
});

describe('makeObservable(target) tests', () => {
    let user;
    
    beforeEach(() => {
       user = {
        name: 'Vincent',
        age: 17
        }; 
    });

    it('Must return instance of another object', () => {
        let tempObj = makeObservable(user);
        assert.notStrictEqual(user, tempObj);
        expect(tempObj).to.not.be.undefined;
    });

    it('Returned object must include observe() function', () => {
        expect(user).not.to.include.all.keys("observe");
        let tempObj = makeObservable(user);
        expect(tempObj).to.include.all.keys("observe");
        assert(tempObj.observe instanceof Function);
    });

    it('Adds handler to proxy then observe is invoked', () => {
        let handler = (key, value) => {
            console.log(key, value);
        };
        console.log = sinon.spy(console, 'log');
        let tempObj = makeObservable(user);
        tempObj.observe(handler);
        assert.strictEqual(console.log.callCount, 0);
        tempObj.age = 21;
        assert.strictEqual(console.log.callCount, 1);
        assert(console.log.getCall(0).calledWith('age', 21));
        tempObj.observe(handler);
        tempObj.age = 255;
        assert.strictEqual(console.log.callCount, 3);
        assert(console.log.getCall(1).calledWith('age', 255));
        assert(console.log.getCall(2).calledWith('age', 255));
        console.log.restore();
    });
});