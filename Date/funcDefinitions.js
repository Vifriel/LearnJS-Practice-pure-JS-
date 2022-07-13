//Exercises from https://learn.javascript.ru/date#tasks
"use strict";
function getWeekDay(date) {
    if (!(date instanceof Date)) {
        return null;
    };
    
    switch (date.getDay()) {
        case 0:
            result = "Sun";
            break;
        case 1:
            result = "Mon";
            break;
        case 2:
            result = "Tue";
            break;
        case 3:
            result = "Wed";
            break;
        case 4:
            result = "Thu";
            break;
        case 5:
            result = "Fri";
            break;
        case 6:
            result = "Sat";
            break;
    };

    return date.toString().substring(0, 3);
    //For English version also possible just return date.toString().substring(0, 3);
};

function getDayAgo(date, days) {
    if (!(date instanceof Date)) {
        return null;
    };

    if (!isFinite(days)) {
        return null;
    };

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days).getDate();
};

function getLastDayOfMonth(year, month) {
    if (!isFinite(year) || !isFinite(month)) {
        return null;
    };

    //checks Date type limits
    if (year > 275760 || year < -271822 || (year == 275760 && month > 7) || (year == -271822 && month < 3)) {
        return null;
    };

    return new Date(year, month + 1, 0).getDate();
};

function getSecondsToday() {
    let timeNow = new Date(Date.now());
    return Math.floor((timeNow - new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate())) * 1e-3);
};

function getSecondsToTomorrow() {
    let timeNow = new Date(Date.now());
    let nextDayDate = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate() + 1);
    return Math.floor((nextDayDate - timeNow) * 1e-3);
};

function formatDate(date) {
    if (!(date instanceof Date)) {
        return null;
    }
    if (date - new Date(Date.now()) < 1000) {
        return "right now";
    }
    let nextCheck = Math.floor((date - new Date(Date.now())) / 1000);

    if (nextCheck < 60) {
        return "n sec. ago".replace('n', nextCheck);
    }

    if (nextCheck < 3600) {
        return "n min. ago".replace('n', Math.floor(nextCheck / 60));
    }
    
    let day = date.getDate();
    day = day >= 10 ? String(day) : '0' + day;
    let month = date.getMonth() + 1;
    month = month >= 10 ? String(month) : '0' + month;
    let year = String(date.getFullYear()).padStart(4, '0').substring(2);

    return `${day}.${month}.${year} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}