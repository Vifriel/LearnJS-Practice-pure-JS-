describe('getWeekDay(date) tests', () => {
    someDates = new Map();
    someDates.set(new Date(2022, 3, 18), "Mon");
    someDates.set(new Date(1948, 0, 6), "Tue");
    someDates.set(new Date(1975, 5, 18), "Wed");
    someDates.set(new Date(1938, 1, 10), "Thu");
    someDates.set(new Date(1966, 11, 30), "Fri");
    someDates.set(new Date(1956, 7, 4), "Sat");
    someDates.set(new Date(1994, 9, 23), "Sun");

    it('if date is not a valid date, object returns null', () => {
        expect(getWeekDay("123123")).to.be.null;
        expect(getWeekDay(123)).to.be.null;
        expect(getWeekDay(NaN)).to.be.null;
        expect(getWeekDay(null)).to.be.null;
        expect(getWeekDay(undefined)).to.be.null;
        expect(getWeekDay({})).to.be.null;
        expect(getWeekDay([])).to.be.null;
    });
    describe('returns short name of week day (e.g. Mon for 04-18-2022) based on date argument', () => {

        for (const [key, value] of someDates.entries()) {
            it(`returns ${value} for ${key.toString()}`, () => {
                assert.strictEqual(getWeekDay(key), value);
            });
        }
    });
});

describe('getDayAgo(date, days) tests', () => {
    it('if date is not a valid date object, returns null', () => {
        expect(getDayAgo("123123", 123)).to.be.null;
        expect(getDayAgo(123, 123)).to.be.null;
        expect(getDayAgo(NaN, 123)).to.be.null;
        expect(getDayAgo(null, 123)).to.be.null;
        expect(getDayAgo(undefined, 123)).to.be.null;
        expect(getDayAgo({}, 123)).to.be.null;
        expect(getDayAgo([], 123)).to.be.null;
    });

    it('if days is not a valid number, returns null (null and an empty [] are converted to 0 automatically)', () => {
        let someDate = new Date(2022, 3, 22);
        expect(getDayAgo(someDate, "awdawd")).to.be.null;
        expect(getDayAgo(someDate, Infinity)).to.be.null;
        expect(getDayAgo(someDate, NaN)).to.be.null;
        expect(getDayAgo(someDate, undefined)).to.be.null;
        expect(getDayAgo(someDate, {})).to.be.null;
        expect(getDayAgo(someDate, [1, 5, 6])).to.be.null;
    });

    it('Otherwise returns day of the month for the date equal "date" argument minus "days" argument number of days. Returns day for future if "days" is negative', () => {
        let someDate = new Date(2022, 3, 22);
        let tempDate = new Date(someDate.getTime());
        assert.strictEqual(getDayAgo(someDate, 10), 12);
        assert.deepEqual(someDate, tempDate);
        assert.strictEqual(getDayAgo(someDate, 365), 22);
        assert.strictEqual(getDayAgo(someDate, 730), 22);
        someDate = new Date(1976, 0, 6);
        assert.strictEqual(getDayAgo(someDate, -5), 11);
        someDate = new Date(1845, 5, 1);
        assert.strictEqual(getDayAgo(someDate, 1), 31);
    });
});

describe('getLastDayOfMonth(year, month) tests', () => {
    it('if year or month are not valid numbers, returns null', () => {
        expect(getLastDayOfMonth(123, "efweed")).to.be.null;
        expect(getLastDayOfMonth(123, NaN)).to.be.null;
        expect(getLastDayOfMonth(123, Infinity)).to.be.null;
        expect(getLastDayOfMonth(123, undefined)).to.be.null;
        expect(getLastDayOfMonth(123, {})).to.be.null;
        expect(getLastDayOfMonth(123, [1, 2, 3])).to.be.null;
        expect(getLastDayOfMonth("efweed", 123)).to.be.null;
        expect(getLastDayOfMonth(NaN, 123)).to.be.null;
        expect(getLastDayOfMonth(Infinity, 123)).to.be.null;
        expect(getLastDayOfMonth(undefined, 123)).to.be.null;
        expect(getLastDayOfMonth({}, 123)).to.be.null;
        expect(getLastDayOfMonth([1, 2, 3], 123)).to.be.null;
    });
    it('If year and month combination overflowes the Date format limit (-1 month to zero int representation for positive limit), returns null', () => {
        expect(getLastDayOfMonth(-271822, 2)).to.be.null;
        expect(getLastDayOfMonth(-271822, 3)).not.to.be.null;
        expect(getLastDayOfMonth(275760, 8)).to.be.null;
        expect(getLastDayOfMonth(-271822, 7)).not.to.be.null;
    });
    it('Otherwise returns the last day number of "month" of the "year', () => {
        assert.strictEqual(getLastDayOfMonth(2022, 3), 30);
        assert.strictEqual(getLastDayOfMonth(2022, 1), 28);
        assert.strictEqual(getLastDayOfMonth(2020, 0), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 1), 29);
        assert.strictEqual(getLastDayOfMonth(2020, 2), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 3), 30);
        assert.strictEqual(getLastDayOfMonth(2020, 4), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 5), 30);
        assert.strictEqual(getLastDayOfMonth(2020, 6), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 7), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 8), 30);
        assert.strictEqual(getLastDayOfMonth(2020, 9), 31);
        assert.strictEqual(getLastDayOfMonth(2020, 10), 30);
        assert.strictEqual(getLastDayOfMonth(2020, 11), 31);
    });
});

describe('getSecondsToday() tests', () => {
    before(() => {
        Date.now = sinon.stub(Date, "now");

        Date.now.onCall(0).returns(new Date(2021, 4, 3, 0, 0, 0).getTime());
        Date.now.onCall(1).returns(new Date(2021, 4, 3, 0, 1, 0).getTime());
        Date.now.onCall(2).returns(new Date(2021, 4, 3, 1, 0, 0).getTime());
        Date.now.onCall(3).returns(new Date(2021, 4, 4, 0, 0, 0).getTime());
        Date.now.onCall(4).returns(new Date(2021, 4, 4, 23, 59, 59).getTime());
    });

    after(() => {
        Date.now.restore();
    });

    it('Returns number of seconds have elapsed since last midnight', () => {
        assert.strictEqual(getSecondsToday(), 0);
        assert.strictEqual(getSecondsToday(), 60);
        assert.strictEqual(getSecondsToday(), 3600);
        assert.strictEqual(getSecondsToday(), 0);
        assert.strictEqual(getSecondsToday(), 86399);
    });
});

describe('getSecondsToTomorrow() tests', () => {
    before(() => {
        Date.now = sinon.stub(Date, "now");

        Date.now.onCall(0).returns(new Date(2021, 4, 3, 0, 0, 0).getTime());
        Date.now.onCall(1).returns(new Date(2021, 4, 3, 0, 1, 0).getTime());
        Date.now.onCall(2).returns(new Date(2021, 4, 3, 1, 0, 0).getTime());
        Date.now.onCall(3).returns(new Date(2021, 4, 4, 0, 0, 0).getTime());
        Date.now.onCall(4).returns(new Date(2021, 4, 4, 23, 59, 59).getTime());
    });

    after(() => {
        Date.now.restore();
    });

    it('Returns number of seconds until the next day', () => {
        assert.strictEqual(getSecondsToTomorrow(), 86400);
        assert.strictEqual(getSecondsToTomorrow(), 86340);
        assert.strictEqual(getSecondsToTomorrow(), 82800);
        assert.strictEqual(getSecondsToTomorrow(), 86400);
        assert.strictEqual(getSecondsToTomorrow(), 1);
    });
});

describe('formatDate(date) tests', () => {
    const resultsArray = [
        "right now",
        "n sec. ago",
        "n min. ago"
    ];
    before(() => {
        Date.now = sinon.stub(Date, "now");
        Date.now.returns(new Date(2021, 4, 3, 0, 0, 0).getTime());
    });
    after(() => {
        Date.now.restore();
    });
    it('if date is not a valid date, object returns null', () => {
        expect(formatDate("123123")).to.be.null;
        expect(formatDate(123)).to.be.null;
        expect(formatDate(NaN)).to.be.null;
        expect(formatDate(null)).to.be.null;
        expect(formatDate(undefined)).to.be.null;
        expect(formatDate({})).to.be.null;
        expect(formatDate([])).to.be.null;
    });
    it('if date is more than Date.now() by less than a second, returns string "right now"', () => {
        let pastDate = new Date(2021, 4, 3);
        assert.strictEqual(formatDate(pastDate), resultsArray[0]);
        pastDate = new Date(2021, 4, 3, 0, 0, 0, 999);
        assert.strictEqual(formatDate(pastDate), resultsArray[0]);
        pastDate = new Date(2021, 4, 3, 0, 0, 0, 1000);
        assert.notStrictEqual(formatDate(pastDate), resultsArray[0]);
    });
    it('if date is more than Date.now() by great than a second and less than a minute, returns string "n sec. ago", where n is the actual number of elapsed seconds', () => {
        let pastDate = new Date(2021, 4, 3, 0, 0, 0, 1000);
        assert.strictEqual(formatDate(pastDate), resultsArray[1].replace('n', '1'));
        pastDate = new Date(2021, 4, 3, 0, 0, 30, 999);
        assert.strictEqual(formatDate(pastDate), resultsArray[1].replace('n', '30'));
        pastDate = new Date(2021, 4, 3, 0, 0, 61);
        assert.notStrictEqual(formatDate(pastDate), resultsArray[1].replace('n', '61'));
    });
    it('if date is more than Date.now() by great than a minute and less than an hour, returns string "n min. ago", where m is the actual number of elapsed seconds', () => {
        let pastDate = new Date(2021, 4, 3, 0, 5, 0, 0);
        assert.strictEqual(formatDate(pastDate), resultsArray[2].replace('n', '5'));
        pastDate = new Date(2021, 4, 3, 0, 5, -4, 0);
        assert.strictEqual(formatDate(pastDate), resultsArray[2].replace('n', '4'));
        pastDate = new Date(2021, 4, 3, 0, 61, 0, 0);
        assert.notStrictEqual(formatDate(pastDate), resultsArray[2].replace('n', '61'));
    });
    it('Otherwise returns full date in "DD.MM.YY HH:mm" format', () => {
        let pastDate = new Date(2021, 4, 3, 1, 0, 0, 0);
        assert.strictEqual(formatDate(pastDate), '03.05.21 01:00');
        pastDate = new Date(2021, 4, 4, 1, 34, -4, 0);
        assert.strictEqual(formatDate(pastDate), '04.05.21 01:33');
        pastDate = new Date(2017, 11, 12, 15, 41, 0);
        assert.notStrictEqual(formatDate(pastDate), '12.12.17 15:41');
        pastDate = new Date(3, 11, 12, 15, 41, 0);
        assert.notStrictEqual(formatDate(pastDate), '12.12.03 15:41');
    });
});