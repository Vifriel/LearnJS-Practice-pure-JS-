//Excercise on https://learn.javascript.ru/string

describe('ucFirst(str) tests', () => {
    it('Returns string', () => {
        expect(ucFirst("awdwd")).to.be.a("string");
        expect(ucFirst(null)).to.be.a("string");
        expect(ucFirst(undefined)).to.be.a("string");
        expect(ucFirst(234)).to.be.a("string");
        expect(ucFirst(NaN)).to.be.a("string");
        expect(ucFirst({bob: "sadadw"})).to.be.a("string");
        expect(ucFirst([1, "awdd", 345, {fog:"of war"}])).to.be.a("string");
    });
    it('If the argument initial type is string, returns a string equals argument with first letter upper case', () => {
        assert.strictEqual(ucFirst("lorem"), "Lorem");
        assert.strictEqual(ucFirst("Ipsum"), "Ipsum");
        assert.strictEqual(ucFirst("долор"), "Долор");
        assert.strictEqual(ucFirst("Сит"), "Сит");
    });
});

describe('checkSpam(str) tests', () => {
    it('Returns bool', () => {
        expect(checkSpam("awdawdwd")).to.be.a("boolean");
        expect(checkSpam(123123)).to.be.a("boolean");
        expect(checkSpam(true)).to.be.a("boolean");
        expect(checkSpam("xxxweef")).to.be.a("boolean");
    });
    it('Returns true, if the argument is a string and it contains "xxx" or "viagra" case insensitive', () => {
        assert.strictEqual(checkSpam("sfefefsefef"), false);
        assert.strictEqual(checkSpam("uysegfeiydfxXxaopwdiuywodu"), true);
        assert.strictEqual(checkSpam(null), false);
        assert.strictEqual(checkSpam({spam: "viagra"}), false);
        assert.strictEqual(checkSpam("24tegregsvIaGRaggftjh"), true);
    });
});

describe('truncate(str, maxlength) tests', () => {
    it('Returns string if str is a string and maxlength > 0, returns null otherwise', () => {
        expect(truncate("ewrger", 1)).to.be.a("string");
        expect(truncate("hrgsergrg", 5)).to.be.a("string");
        expect(truncate("sfsefbgrrerrg", 10)).to.be.a("string");
        expect(truncate("sfsefbgrrerrg", 0)).to.be.null;
        expect(truncate(undefined, 123123)).to.be.null;
        expect(truncate({name: "Vincent"}, 12)).to.be.null;
    });
    it('Returns str if maxlength > str.length', () => {
        assert.strictEqual(truncate("ewrger", 6), "ewrger");
        assert.strictEqual(truncate("asfeawdwad", 20), "asfeawdwad");
    });
    it('If maxlength < str.length returns new string equals str minus last (maxlenght - str.lenght - 1) of characters plus multipoint single char ', () => {
        assert.equal(truncate("ohaiuhsfeieoushfiusf", 5), "ohai…");
        assert.equal(truncate("гнпашфвшфгцвршцщгвр", 10), "гнпашфвшф…");
        assert.equal(truncate("шгпаунапугнап", 6), "шгпау…");
        assert.equal(truncate("sielrufiuyrfguyfgeuyrfgeuyrfgeruyfgreuyf", 20), "sielrufiuyrfguyfgeu…");
        assert.equal(truncate("EFFSEFsefsef", 3), "EF…");
    });
});

describe('extractCurrencyValue(str) tests', () => {
    it('Returns null if str is not a string', () => {
        expect(extractCurrencyValue(123123123)).to.be.null;
        expect(extractCurrencyValue(null)).to.be.null;
        expect(extractCurrencyValue({})).to.be.null;
        expect(extractCurrencyValue(["awdwd", "sefefesf", "edawdw"])).to.be.null;
        expect(extractCurrencyValue(undefined)).to.be.null;
        expect(extractCurrencyValue(NaN)).to.be.null;
    });
    it('Returns null if str does not have the format like "$someDigitsHereProbablyPointSeparatorAndMoreDigits"', () => {
        expect(extractCurrencyValue("kaiuwgduywdg")).to.be.null;
        expect(extractCurrencyValue("123123")).to.be.null;
        expect(extractCurrencyValue("$123123sfesfsef")).to.be.null;
        expect(extractCurrencyValue("$aoidhawodiuh")).to.be.null;
        expect(extractCurrencyValue("12323$adawd")).to.be.null;
        expect(extractCurrencyValue("$123123$345345")).to.be.null;
        expect(extractCurrencyValue("$123.123.34")).to.be.null;
        expect(extractCurrencyValue("$@#!@#")).to.be.null;
    });
    it('Otherwise returns number after "$" in str', () => {
        assert.strictEqual(extractCurrencyValue("$123123123"), 123123123);
        assert.strictEqual(extractCurrencyValue("$3434"), 3434);
        assert.strictEqual(extractCurrencyValue("$0987654321"), 987654321);
        assert.strictEqual(extractCurrencyValue("$123123123"), 123123123);
        assert.strictEqual(extractCurrencyValue("$123.345"), 123.345);
    });
});