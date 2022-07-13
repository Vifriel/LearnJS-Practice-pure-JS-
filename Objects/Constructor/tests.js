describe('Accumulator tests', () => {
    describe('Constructor gets one parameter and puts its numeric representation of it into field "value"', () => {
        it('For input 123 value = 123', () => {
            let accum = new Accumulator(123);
            assert.equal(accum.value, 123);
        }); 

        it('For input "345sfesf23" value = 345', () => {
            let accum = new Accumulator("345sfesf23");
            assert.isNaN(accum.value);
        });

        it('For input "awdwdwd" value = NaN', () => {
            let accum = new Accumulator("awdwdwd");
            assert.isNaN(accum.value);
        });
    });
    describe('read() gets input from propt, converts it to a number and adds to value property', () => {
        before(() => {
            window.prompt = sinon.stub(window, 'prompt');

            prompt.onCall(0).returns(0);
            prompt.onCall(1).returns(111);
            prompt.onCall(2).returns("111");
            prompt.onCall(3).returns("45645sesfefef");
            prompt.onCall(4).returns(NaN);
            prompt.onCall(5).returns(null);
            prompt.onCall(6).returns(undefined);
        });
        it('read() must return this', () => {
            let accum = new Accumulator(0);
            assert.equal(accum.read(), accum);
        });
        it('if value = 111 returns 130 for initial Accumulator value equals 29', () => {
            let accum = new Accumulator(29);
            assert.equal(accum.read().value, 130);
        });
        it('if value = "111" returns 125 for initial Accumulator value equals 14', () => {
            let accum = new Accumulator(14);
            assert.equal(accum.read().value, 125);
        });
        it('if value = "45645sesfefef" returns NaN for any initial Accumulator value', () => {
            let accum = new Accumulator(14);
            assert.isNaN(accum.read().value);
        });
        it('if value = NaN returns NaN for any initial Accumulator value', () => {
            let accum = new Accumulator(14);
            assert.isNaN(accum.read().value);
        });
        it('if value = null returns value for any initial Accumulator value', () => {
            let accum = new Accumulator(14);
            assert.equal(accum.read().value, 14);
        });
        it('if value = undefined returns undefined for any initial Accumulator value', () => {
            let accum = new Accumulator(14);
            assert.isNaN(accum.read().value);
        });
    });
});