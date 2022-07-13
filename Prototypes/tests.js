//Exercises from https://learn.javascript.ru/native-prototypes
"use strict";
let timers = sinon.useFakeTimers();
describe('Function.prototype.defer(ms) tests', () => {
    let doSmth = function invokeChecker() {
        if(invokeChecker.callCount === undefined)
        {
            invokeChecker.callCount = 0;
        }
        console.log(`invoked ${++invokeChecker.callCount} times`);
    }
    before(() => {
        setTimeout = sinon.spy(window, 'setTimeout');
        doSmth = sinon.spy(doSmth);
    });
    after(() => {
        setTimeout.restore();
        timers.reset();
    });
    it('If ms is not a valid number, does nothing', () => {
        expect(doSmth.defer("awdwadwad")).to.be.undefined;
        expect(doSmth.defer(NaN)).to.be.undefined;
        expect(doSmth.defer(Infinity)).to.be.undefined;
        expect(doSmth.defer({})).to.be.undefined;
        expect(doSmth.defer([1, 2, 3])).to.be.undefined;
        assert.strictEqual(setTimeout.callCount, 0);
    });
    it('Otherwise must call function with extension after the ms millisecons delay', () => {
        assert.strictEqual(setTimeout.callCount, 0);
        assert.strictEqual(doSmth.callCount, 0);
        doSmth.defer(1000);
        assert.strictEqual(setTimeout.callCount, 1);
        assert.strictEqual(doSmth.callCount, 0);
        timers.tick(999);
        assert.strictEqual(setTimeout.callCount, 1);
        assert.strictEqual(doSmth.callCount, 0);
        timers.tick(1);
        assert.strictEqual(setTimeout.callCount, 1);
        assert.strictEqual(doSmth.callCount, 1);
    });
});

describe('Function.prototype.deferWrap(ms) decorator tests', () => {
    let doSmth = function invokeChecker(output) {
        console.log(output);
        return output;
    }
    before(() => {
        setTimeout = sinon.spy(window, 'setTimeout');
        doSmth = sinon.spy(doSmth);
    });
    after(() => {
        setTimeout.restore();
        timers.reset();
    });
    it('If ms is not a valid number, returns an empty function', () => {
        expect(doSmth.deferWrap("awdwadwad")(123)).to.be.undefined;
        expect(doSmth.deferWrap(NaN)(123)).to.be.undefined;
        expect(doSmth.deferWrap(Infinity)(123)).to.be.undefined;
        expect(doSmth.deferWrap({})(123)).to.be.undefined;
        expect(doSmth.deferWrap([1, 2, 3])(123)).to.be.undefined;
        assert.strictEqual(doSmth.callCount, 0);
    });
    it('Must return a function', () => {
        expect(doSmth.deferWrap("awdwadwad")).to.be.an.instanceof(Function);
        expect(doSmth.deferWrap(NaN)).to.be.an.instanceof(Function);
        expect(doSmth.deferWrap(Infinity)).to.be.an.instanceof(Function);
        expect(doSmth.deferWrap({})).to.be.an.instanceof(Function);
        expect(doSmth.deferWrap([1, 2, 3])).to.be.an.instanceof(Function);
        assert.strictEqual(doSmth.callCount, 0);
    });
    
    it('If ms is correct number, invokes wrapped function after delay', () => {
        doSmth.resetHistory();
        setTimeout.resetHistory();
        doSmth.deferWrap(1000)(123);
        assert.strictEqual(doSmth.callCount, 0); 
        timers.tick(999);
        assert.strictEqual(doSmth.callCount, 0); 
        timers.tick(1);
        assert.strictEqual(doSmth.callCount, 1); 
    });
});