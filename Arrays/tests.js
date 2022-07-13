describe('sumInput() tests', () => {
    beforeEach(() => {
        window.prompt = sinon.stub(window, 'prompt');
    });

    afterEach(() => {
        prompt.restore();
    });

    describe('forces prompt to get user\'s input until user cancels input or puts in non-digital value', () => {
        it('For input sequence "0", "1", "awdwad", "123123"', () => {
            prompt.onCall(0).returns("0");
            prompt.onCall(1).returns("1");
            prompt.onCall(2).returns("awdwad");
            prompt.onCall(3).returns("123123");
            sumInput();
            assert(prompt.lastCall.returned("awdwad"));
        });

        it('For input sequence "esrgrfrf", "1", "awdwad", "123123"', () => {
            prompt.onCall(0).returns("esrgrfrf");
            prompt.onCall(1).returns("1");
            prompt.onCall(2).returns("awdwad");
            prompt.onCall(3).returns("123123");
            sumInput();
            assert(prompt.lastCall.returned("esrgrfrf"));
        });

        it('For input sequence "0", "1", "3", "123123", null', () => {
            prompt.onCall(0).returns("0");
            prompt.onCall(1).returns("1");
            prompt.onCall(2).returns("3");
            prompt.onCall(3).returns("123123");
            prompt.onCall(4).returns(null);
            sumInput();
            assert(prompt.lastCall.returned(null));
        });

        it('For input sequence "0", "1", "", "3", "123123",', () => {
            prompt.onCall(0).returns("0");
            prompt.onCall(1).returns("1");
            prompt.onCall(2).returns("");
            prompt.onCall(3).returns("3");
            prompt.onCall(4).returns("123123");
            sumInput();
            assert(prompt.lastCall.returned(""));
        });
    });

    describe('returns null if inner array of received numbers has zero length', () => {
        it('For "esrgrfrf" input', () => {
            prompt.onCall(0).returns("esrgrfrf");
            expect(sumInput()).to.be.null;
        });

        it('For null input', () => {
            prompt.onCall(0).returns(null);
            expect(sumInput()).to.be.null;
        });

        it('For empty string input', () => {
            prompt.onCall(0).returns('');
            expect(sumInput()).to.be.null;
        });
    });

    describe('returns sum of all array elemets otherwise', () => {        
        it('For input sequence "5", null returns 5', () => {
        prompt.onCall(0).returns("5");
        prompt.onCall(1).returns(null);
        assert.strictEqual(sumInput(),5);
        });
        it('For input sequence "0", "1", "-5", "20", null returns 16', () => {
            prompt.onCall(0).returns("0");
            prompt.onCall(1).returns("1");
            prompt.onCall(2).returns("-5");
            prompt.onCall(3).returns("20");
            prompt.onCall(4).returns(null);
            assert.strictEqual(sumInput(),16);
        });

        it('For input sequence "-90", "10", "-5", "20", "44", null returns -21', () => {
            prompt.onCall(0).returns("-90");
            prompt.onCall(1).returns("10");
            prompt.onCall(2).returns("-5");
            prompt.onCall(3).returns("20");
            prompt.onCall(4).returns("44");
            prompt.onCall(5).returns(null);
            assert.strictEqual(sumInput(), -21);
        });


        it('For input sequence "100", "10", "1", null returns 111', () => {
            prompt.onCall(0).returns("100");
            prompt.onCall(1).returns("10");
            prompt.onCall(2).returns("1");
            prompt.onCall(4).returns(null);
            assert.strictEqual(sumInput(), 111);
        });
    });
});

describe('getMaxSubSum(arr) tests', () => {
    describe('If arr isn\'t instance of Array(), returns null', () => {
        it('arr is a string', () => {
            let arr = "awdawdwadwd";
            expect(getMaxSubSum(arr)).to.be.null;
        });
        
        it('arr is null', () => {
            let arr = null;
            expect(getMaxSubSum(arr)).to.be.null;
        });

        it('arr is a random object', () => {
            let arr = {};
            expect(getMaxSubSum(arr)).to.be.null;
        });

        it('arr is a number', () => {
            let arr = 123;
            expect(getMaxSubSum(arr)).to.be.null;
        });

        it('arr is undefined', () => {
            let arr = undefined;
            expect(getMaxSubSum(arr)).to.be.null;
        });
    });

    describe('If any element in arr is not a valid number, returns null', () => {
        
        it('arr includes non-digintal string', () => {
            let arr = [1, 6, 7, "123adaw"];
            expect(getMaxSubSum(arr)).to.be.null;
        });

        it('arr includes NaN', () => {
            let arr = [1, 34, NaN];
            expect(getMaxSubSum(arr)).to.be.null;
        });

        it('arr includes another object', () => {
            let arr = [1, 2, {1:"rgtg"}];
            expect(getMaxSubSum(arr)).to.be.null;
        });
    });

    describe('If all elements in arr are negative or zero integers, returns 0', () => {
        it('for arr = [-1, -4, -6, -14, -5]', () => {
            let arr = [-1, -4, -6, -14, -5];
            assert.strictEqual(getMaxSubSum(arr), 0);
        });

        it('for arr = [-1, -23, 0, -234324, -14, 0]', () => {
            let arr = [-1, -23, 0, -234324, -14, 0];
            console.log("for arr = [-1, -23, 0, -234324, -14, 0]");
            assert.strictEqual(getMaxSubSum(arr), 0);
        });
    });

    describe('Otherwise returns maximum sum of possible sub arrays from arr', () => {
        it('for arr = [12, -4, -6, 5, -8, 5, 7, 1, -6, 3] returns sum of [5, 7, 1] = 13', () => {
            let arr = [12, -4, -6, 5, -8, 5, 7, 1, -6, 3];
            console.log("for arr = [12, -4, -6, 5, -8, 5, 7, 1, -6, 3]");
            assert.strictEqual(getMaxSubSum(arr), 13);
        });

        it('for arr = [-6, -10, -4, -9, 3, -1, -15, 15, 6, -7, 9, -1, 2, -12, -12, 3, 13, -14, 1, -15, -5, -15, -7, 14, 8, 15, 10, -3, -6, 10, -5] returns sum of [14, 8, 15, 10, -3, -6, 10] = 48', () => {
            let arr = [-6, -10, -4, -9, 3, -1, -15, 15, 6, -7, 9, -1, 2, -12, -12, 3, 13, -14, 1, -15, -5, -15, -7, 14, 8, 15, 10, -3, -6, 10, -5];
            console.log("for arr = [-6, -10, -4, -9, 3, -1, -15, 15, 6, -7, 9, -1, 2, -12, -12, 3, 13, -14, 1, -15, -5, -15, -7, 14, 8, 15, 10, -3, -6, 10, -5]");
            assert.strictEqual(getMaxSubSum(arr), 48);
        });
    });
});