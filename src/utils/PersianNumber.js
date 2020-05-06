function toPersianNum( num, dontTrim ) {
    var i = 0,

        dontTrim = dontTrim || false,
        num = dontTrim ? num.toString() : num.toString().trim(),
        len = num.length,

        res = '',
        pos,

        persianNumbers = typeof persianNumber == 'undefined' ?
            ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
            persianNumbers;

    for (; i < len; i++)
        if (( pos = persianNumbers[num.charAt(i)] ))
            res += pos;
        else
            res += num.charAt(i);

    return res;
}

function isFarsiNumber(str) {
    var p = /^[\u06F0-\u06F90-9]+$/;

    if (!p.test(str)) {
        return false;
    }
    return true;
}
export default toPersianNum;