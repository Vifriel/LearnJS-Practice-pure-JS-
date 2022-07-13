describe('Calculator functions tests', () => {
    describe('For values 3 and 8', () => {
        beforeEach(() => {
            sinon.stub(window, "prompt");

            prompt.onCall(0).returns("3");
            prompt.onCall(1).returns("8");
            prompt.onCall(2).returns("3");
            prompt.onCall(3).returns("8");
        });

        afterEach(function() {
            prompt.restore();
        });

        it('Read gets two values and writes they to object variables', () => {
            let calc = new Calculator();
            let tempObj = {...calc};
            calc.read();
            assert.notDeepEqual(calc, tempObj);
            tempObj = {...calc};
            calc.read();
            assert.deepEqual(calc, tempObj);
        });

        it('Sum returns 11', () => {
            let calc = new Calculator();
            calc.read();
            assert.equal(calc.sum(), 11);
        });

        it('Mul returns 24', () => {
            let calc = new Calculator();
            calc.read();
            assert.equal(calc.mul(), 24);
        });
    });
});

describe('Ladder functions test', () => {
    before(() => {
       window.alert = sinon.stub(window, "alert");
    });
      

    it('up() must return this', () => {
        let ladder = new Ladder();
        assert.equal(ladder.up(), ladder);
    });

    it('down() must return this', () => {
        let ladder = new Ladder();
        assert.equal(ladder.down(), ladder);
    });

    it('showStep() must call an alert', () => {
        let ladder = new Ladder();
        ladder.showStep();
        assert(alert.called);
    });

    it('up() must increase count of steps by 1', () => {
        let ladder = new Ladder();
        assert.equal(ladder.up().step, 1);
    });

    
    it('down() must decrease count of steps by 1', () => {
        let ladder = new Ladder();
        assert.equal(ladder.down().step, -1);
    });

    it('up().up().down().up().down().step should be equal to 1', () => {
        
        let ladder = new Ladder();
        assert.equal(ladder.up().up().down().up().down().step, 1);
    });
});