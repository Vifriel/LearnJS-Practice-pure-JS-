//Exercises from https://learn.javascript.ru/call-apply-decorators#perehodim-k-neskolkim-argumentam-s-func-apply
describe('paramsAdhesive(...params)', () => {
    it('Returns JSON stringify value of params. All specified for JS values like NaN, infinities, undefined transform to null', () => {
        assert.strictEqual(paramsAdhesive(), '[]');
        assert.strictEqual(paramsAdhesive([1, 2, 3]), '[[1,2,3]]');
        assert.strictEqual(paramsAdhesive(1, 2, 3), '[1,2,3]');
        assert.strictEqual(paramsAdhesive(NaN, null, undefined, Infinity, [123, "sadadw", true], "awdwad", {site: "xxx.yyy", john: "doe"}), '[null,null,null,null,[123,"sadadw",true],"awdwad",{"site":"xxx.yyy","john":"doe"}]');
    });
});

describe('simpleSpy(func) tests', () => {
    let doSomething;    
    beforeEach(() => {
        doSomething= function (a, b) {
            return a % b;
        };;
    });
    it('Throw an exception if func is not a function', () => {
        expect(function() {return simpleSpy(123);}).to.throw(TypeError);
        expect(function() {return simpleSpy(NaN);}).to.throw(TypeError);
        expect(function() {return simpleSpy(null);}).to.throw(TypeError);
        expect(function() {return simpleSpy(undefined);}).to.throw(TypeError);
        expect(function() {return simpleSpy([1, 2, 3]);}).to.throw(TypeError);
        expect(function() {return simpleSpy({});}).to.throw(TypeError);
        expect(function() {return simpleSpy([]);}).to.throw(TypeError);
        expect(function() {return simpleSpy("adwawdwd");}).to.throw(TypeError);
    });
    it('Return type is the Function', () => {
        expect(simpleSpy(doSomething)).to.be.an.instanceof(Function);
    });
    it('Returns the wrapped function in parameters with calls property that allows to see all params from previous function calls', () => {
        doSomething = simpleSpy(doSomething);
        assert.strictEqual(doSomething(1, 3), 1);
        assert.strictEqual(doSomething(5, 8), 5);
        assert.strictEqual(doSomething(7, 1), 0);
        assert.strictEqual(doSomething(4, 2), 0);
        assert.deepEqual(doSomething.calls[0], [1, 3]);
        assert.deepEqual(doSomething.calls[1], [5, 8]);
        assert.deepEqual(doSomething.calls[2], [7, 1]);
        assert.deepEqual(doSomething.calls[3], [4, 2]);
    });
});

let timers = sinon.useFakeTimers();

describe('delay(f, ms) tests', () => {
    let doSomething;
    let spy;
    before(() => {
        window.alert = sinon.stub(window, 'alert');
        spy = sinon.spy(window, 'setTimeout');
    });
    after(() => {
        window.alert.restore();
        timers.reset();
        spy.restore();
    });    
    beforeEach(() => {
        doSomething = function (arg1, arg2, arg3) {
            alert(arg1 + arg2 + arg3);
        };
    });
    it('Throws an exception if f param is not a function or ms is not a valid number', () => {
        expect(function() {return delay(123, 0);}).to.throw(TypeError);
        expect(function() {return delay(NaN, 0);}).to.throw(TypeError);
        expect(function() {return delay(null, 0);}).to.throw(TypeError);
        expect(function() {return delay(undefined, 0);}).to.throw(TypeError);
        expect(function() {return delay([1, 2, 3], 0);}).to.throw(TypeError);
        expect(function() {return delay({}, 0);}).to.throw(TypeError);
        expect(function() {return delay([], 0);}).to.throw(TypeError);
        expect(function() {return delay("adwawdwd", 0);}).to.throw(TypeError);
        expect(function() {return delay(doSomething, NaN);}).to.throw(TypeError);
        expect(function() {return delay(doSomething, undefined);}).to.throw(TypeError);
        expect(function() {return delay(doSomething, [1, 2, 3]);}).to.throw(TypeError);
        expect(function() {return delay(doSomething, {});}).to.throw(TypeError);
        expect(function() {return delay(doSomething, "adwawdwd");}).to.throw(TypeError);
    });
    it('Return type is the Function', () => {
        expect(delay(doSomething, 123)).to.be.an.instanceof(Function);
    });
    describe('Returns the wrapped function f delayed by the ms parameter in milliseconds', () => {    
        beforeEach(() => {
            doSomething = function (arg1, arg2, arg3) {
                alert(arg1 + arg2 + arg3);
            };
        });
        it('for args 1, 2, 3', () => {
            doSomething = delay(doSomething, 1000);
            doSomething(1, 3, 8);
            assert.strictEqual(alert.callCount, 0);
            timers.tick(999);
            assert.strictEqual(alert.callCount, 0);
            timers.tick(1);
            assert.strictEqual(alert.callCount, 1);
            assert(alert.getCall(0).calledWithExactly(12));
            alert.reset();
            timers.reset();
        });
        it('for args "1","2","3"', () => {
            doSomething = delay(doSomething, 5000);
            doSomething("1","2","3");
            assert.strictEqual(alert.callCount, 0);
            timers.tick(999);
            assert.strictEqual(alert.callCount, 0);
            timers.tick(1);
            assert.strictEqual(alert.callCount,0);
            timers.tick(4000);
            assert.strictEqual(alert.callCount,1);
            assert(alert.getCall(0).calledWithExactly("123"));
            alert.reset();
            timers.reset();
        });
        it('for args 1, 2, NaN', () => {
            doSomething = delay(doSomething, 5000);
            doSomething(1, 2,NaN);
            assert.strictEqual(alert.callCount, 0);
            timers.tick(999);
            assert.strictEqual(alert.callCount, 0);
            timers.tick(1);
            assert.strictEqual(alert.callCount,0);
            timers.tick(4000);
            assert.strictEqual(alert.callCount,1);
            assert(alert.getCall(0).calledWithExactly(NaN));
        });
    });
});

describe('debounce(f, ms) tests', () => {
    let doSomething = function(x) {
        alert(x);
    };
    before(() => {
        window.alert = sinon.stub(window, 'alert');
    });
    after(() => {
        alert.restore();
        timers.reset();
    });
    it('Throws an exception if f param is not a function or ms is not a valid number', () => {
        expect(function() {return debounce(123, 0);}).to.throw(TypeError);
        expect(function() {return debounce(NaN, 0);}).to.throw(TypeError);
        expect(function() {return debounce(null, 0);}).to.throw(TypeError);
        expect(function() {return debounce(undefined, 0);}).to.throw(TypeError);
        expect(function() {return debounce([1, 2, 3], 0);}).to.throw(TypeError);
        expect(function() {return debounce({}, 0);}).to.throw(TypeError);
        expect(function() {return debounce([], 0);}).to.throw(TypeError);
        expect(function() {return debounce("adwawdwd", 0);}).to.throw(TypeError);
        expect(function() {return debounce(doSomething, NaN);}).to.throw(TypeError);
        expect(function() {return debounce(doSomething, undefined);}).to.throw(TypeError);
        expect(function() {return debounce(doSomething, [1, 2, 3]);}).to.throw(TypeError);
        expect(function() {return debounce(doSomething, {});}).to.throw(TypeError);
        expect(function() {return debounce(doSomething, "adwawdwd");}).to.throw(TypeError);
    });
    it('Return type is the Function', () => {
        expect(debounce(doSomething, 123)).to.be.an.instanceof(Function);
    });
    it('Invokes the wrapped function f once per ms milliseconds', () => {
        timers.reset();
        alert.reset();
        doSomething = debounce(doSomething, 5000);
        doSomething(0);
        assert.strictEqual(alert.callCount, 1);
        doSomething(1);
        doSomething(2);
        doSomething(3);
        doSomething(4);
        doSomething(5);
        assert.strictEqual(alert.callCount, 1);
        timers.tick(4999);
        doSomething(7);
        assert.strictEqual(alert.callCount, 1);
        assert(alert.getCall(0).calledWithExactly(0));
        timers.tick(1);
        doSomething(8);
        doSomething(9);
        doSomething(10);
        doSomething(11);
        doSomething(12);
        assert.strictEqual(alert.callCount, 2);
        assert(alert.getCall(1).calledWithExactly(8));
    });
});

describe('throttle(f, ms) tests', () => {
    let doSomething = function(x) {
        alert(x);
    };
    before(() => {
        window.alert = sinon.stub(window, 'alert');
    });
    after(() => {
        alert.restore();
        timers.reset();
    });
    it('Throws an exception if f param is not a function or ms is not a valid number', () => {
        expect(function() {return throttle(123, 0);}).to.throw(TypeError);
        expect(function() {return throttle(NaN, 0);}).to.throw(TypeError);
        expect(function() {return throttle(null, 0);}).to.throw(TypeError);
        expect(function() {return throttle(undefined, 0);}).to.throw(TypeError);
        expect(function() {return throttle([1, 2, 3], 0);}).to.throw(TypeError);
        expect(function() {return throttle({}, 0);}).to.throw(TypeError);
        expect(function() {return throttle([], 0);}).to.throw(TypeError);
        expect(function() {return throttle("adwawdwd", 0);}).to.throw(TypeError);
        expect(function() {return throttle(doSomething, NaN);}).to.throw(TypeError);
        expect(function() {return throttle(doSomething, undefined);}).to.throw(TypeError);
        expect(function() {return throttle(doSomething, [1, 2, 3]);}).to.throw(TypeError);
        expect(function() {return throttle(doSomething, {});}).to.throw(TypeError);
        expect(function() {return throttle(doSomething, "adwawdwd");}).to.throw(TypeError);
    });
    it('Return type is the Function', () => {
        expect(throttle(doSomething, 123)).to.be.an.instanceof(Function);
    });
    it('Invokes the wrapped function f once per ms milliseconds and one more time after delay in the ms if it\'s invoked at delay time', () => {
        timers.reset();
        alert.reset();
        doSomething = throttle(doSomething, 5000);
        doSomething(0);
        assert.strictEqual(alert.callCount, 1);
        doSomething(1);
        doSomething(2);
        doSomething(3);
        doSomething(4);
        doSomething(5);
        assert.strictEqual(alert.callCount, 1);
        timers.tick(4999);
        doSomething(7);
        assert.strictEqual(alert.callCount, 1);
        assert(alert.getCall(0).calledWithExactly(0));
        timers.tick(1);
        assert.strictEqual(alert.callCount, 2);
        console.log(alert.getCall(0).args);
        console.log(alert.getCall(1).args);
        assert(alert.getCall(1).calledWithExactly(7));
        timers.tick(5001);
        assert.strictEqual(alert.callCount, 2);
    });
});