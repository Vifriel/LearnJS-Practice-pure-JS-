function isEmpty(obj) {
    for (const key in obj) {
        return false;        
    }
    return true;
}

function sum(obj) {
    let result = 0;
    for (const key in obj) {
        if (isNaN(Number(obj[key]))) {
            return NaN;
        }
        result += obj[key];      
    }
    return result;
}

function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] === "number") {
            obj[key] *= 2;
        }
    }
}