describe('readNumber() tests', () => {
    before(() => {
        window.prompt = sinon.stub(window, 'prompt');

        prompt.onCall(0).returns(null);
        prompt.onCall(1).returns(null);
        prompt.onCall(2).returns('');
        prompt.onCall(3).returns('awd');
        prompt.onCall(4).returns('123sfesfefsef');
        prompt.onCall(5).returns('3453454');
    });

    it('function calls propmt()', () => {
        readNumber();
        assert(prompt.called);
    });
    it('if user invokes cancel action function must return null', () => {
        assert.isNull(readNumber());
    });
    it('if user puts an empty string function also must return null', () => {
        assert.isNull(readNumber());
    });
    it('else function must repeatedly call propmt until user puts number in the field', () => {
        assert.strictEqual(readNumber(), 3453454);
    });
});
describe('random(min, max) tests', () => {
    it('function returns NaN if one or both of arguments are not real numbers', () => {
        assert.isNaN(random('123', 'adwf'));
    });
    it('function returns min/max value if both of arguments are real numbers and equal to each other', () => {
        assert.strictEqual(random('2', '2'), 2);
    });
    describe('otherwise function returns float number greater or equal to min and lesser than max', () => {
        for (let index = -99; index < 100; index++) {
            const maxValue = 100;
            let result = random(index, maxValue);
            it(`test for min = ${index} and max = ${maxValue}, result equal ${result}`, () => {
                assert(result >=index && result < maxValue);
            });
        }
    });
});
describe('randomInt(min, max) tests', () => {
    it('returns every integer numbers from range with the same probability. Example for min equals 1 and max equals 10 for 100000 generations', () => {
        let maxDispersion = 0.05;
        let countOfChecks = 1e5;
        let minVal = 1;
        let maxVal = 10;
        let counterArray = [0,0,0,0,0,0,0,0,0,0];
        for (let index = 1; index <= countOfChecks; index++) {
            counterArray[randomInt(minVal, maxVal) - 1] += 1;                     
        }
        console.log(counterArray);
        let testResult = counterArray.every(function (item) {
            let idealAllocation = countOfChecks / maxVal;
            return (+item > idealAllocation - idealAllocation * maxDispersion) && (+item < idealAllocation + idealAllocation * maxDispersion);
        });
        expect(testResult).to.be.true;
    });
});