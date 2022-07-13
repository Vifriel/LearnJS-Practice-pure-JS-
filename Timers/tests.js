describe('printNumbersTimeout(from, to) tests', () => {
    let clock;
    before(() => {
        clock = sinon.useFakeTimers();
    });
    after(() => {
        clock.restore();
    });
    let spy;
    beforeEach(() => {
        spy = sinon.spy(window, 'setTimeout');
        window.alert = sinon.stub(window, 'alert');
    });

    afterEach(() => {
        spy.restore();
        window.alert.restore();
    });
    it('Does nothing if from or to param is not a valid number (null and [] automatically transform to 0)', () => {
        expect(printNumbersTimeout("sfefesf", 7)).to.be.undefined;
        expect(printNumbersTimeout(undefined, 7)).to.be.undefined;
        expect(printNumbersTimeout({}, 7)).to.be.undefined;
        expect(printNumbersTimeout([1, 2, 3], 7)).to.be.undefined;
        expect(printNumbersTimeout(Infinity, 7)).to.be.undefined;
        expect(printNumbersTimeout(NaN, 7)).to.be.undefined;
        expect(printNumbersTimeout(7, "sfefesf")).to.be.undefined;
        expect(printNumbersTimeout(7, undefined)).to.be.undefined;
        expect(printNumbersTimeout(7, {})).to.be.undefined;
        expect(printNumbersTimeout(7, [1, 2, 3])).to.be.undefined;
        expect(printNumbersTimeout(7, Infinity)).to.be.undefined;
        expect(printNumbersTimeout(7, NaN)).to.be.undefined;
        assert.strictEqual(spy.callCount, 0);
        assert.strictEqual(alert.callCount, 0);
    });
    it('Does nothing if from param more than to param', () => {
        expect(printNumbersTimeout(15, 7)).to.be.undefined;
        assert.strictEqual(spy.callCount, 0);
        assert.strictEqual(alert.callCount, 0);
    });
    it('Must invoke the timer function and the alert the number of times equals to the difference between from and to parameter', () => {
        printNumbersTimeout(1, 7);
        clock.runAll();
        assert.strictEqual(spy.callCount, 7);
        assert.strictEqual(alert.callCount, 7);
        spy.resetHistory();
        alert.resetHistory();
        printNumbersTimeout(-5, 0);
        clock.runAll();
        assert.strictEqual(spy.callCount, 6);
        assert.strictEqual(alert.callCount, 6);
    });
    it('Must invoke the alert with current number between to and from (including them)', () => {
        printNumbersTimeout(-2, 2);
        clock.runAll();
        let spyCall = alert.getCall(0);
        assert(spyCall.calledWithExactly(-2));
        spyCall = alert.getCall(1);
        assert(spyCall.calledWithExactly(-1));
        spyCall = alert.getCall(2);
        assert(spyCall.calledWithExactly(0));
        spyCall = alert.getCall(3);
        assert(spyCall.calledWithExactly(1));
        spyCall = alert.getCall(4);
        assert(spyCall.calledWithExactly(2));
    });
});

describe('printNumbersInterval(from, to) tests', () => {
    let clock;
    before(() => {
        clock = sinon.useFakeTimers();
    });
    after(() => {
        clock.restore();
    });
    let spy;
    beforeEach(() => {
        spy = sinon.spy(window, 'setInterval');
        window.alert = sinon.stub(window, 'alert');
    });

    afterEach(() => {
        spy.restore();
        window.alert.restore();
    });
    it('Does nothing if from or the param is not a valid number (null and [] automatically transform to 0)', () => {
        expect(printNumbersInterval("sfefesf", 7)).to.be.undefined;
        expect(printNumbersInterval(undefined, 7)).to.be.undefined;
        expect(printNumbersInterval({}, 7)).to.be.undefined;
        expect(printNumbersInterval([1, 2, 3], 7)).to.be.undefined;
        expect(printNumbersInterval(Infinity, 7)).to.be.undefined;
        expect(printNumbersInterval(NaN, 7)).to.be.undefined;
        expect(printNumbersInterval(7, "sfefesf")).to.be.undefined;
        expect(printNumbersInterval(7, undefined)).to.be.undefined;
        expect(printNumbersInterval(7, {})).to.be.undefined;
        expect(printNumbersInterval(7, [1, 2, 3])).to.be.undefined;
        expect(printNumbersInterval(7, Infinity)).to.be.undefined;
        expect(printNumbersInterval(7, NaN)).to.be.undefined;
        assert.strictEqual(spy.callCount, 0);
        assert.strictEqual(alert.callCount, 0);
    });
    it('Does nothing if from param more than to param', () => {
        expect(printNumbersInterval(15, 7)).to.be.undefined;
        assert.strictEqual(spy.callCount, 0);
        assert.strictEqual(alert.callCount, 0);
    });
    it('Must invoke the timer function once and the alert the number of times equals to the difference between from and to parameter', () => {
        printNumbersInterval(1, 7);
        clock.runAll();
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual(alert.callCount, 7);
        spy.resetHistory();
        alert.resetHistory();
        printNumbersInterval(-5, 0);
        clock.runAll();
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual(alert.callCount, 6);
    });
    it('Must invoke the alert with current number between to and from (including them)', () => {
        printNumbersInterval(-2, 2);
        clock.runAll();
        let spyCall = alert.getCall(0);
        assert(spyCall.calledWithExactly(-2));
        spyCall = alert.getCall(1);
        assert(spyCall.calledWithExactly(-1));
        spyCall = alert.getCall(2);
        assert(spyCall.calledWithExactly(0));
        spyCall = alert.getCall(3);
        assert(spyCall.calledWithExactly(1));
        spyCall = alert.getCall(4);
        assert(spyCall.calledWithExactly(2));
    });
});