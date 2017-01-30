/**
 * Custom made helpers for Handlebars.
 * */
module.exports = {
    /**
     * @function
     * @name formatCurrency
     * @param {String} sum The currency value to be formatted
     * @returns {String} Currency formatted with thousand separators
     * @description Adds thousand separator to any value sent to it
     * */
    formatCurrency: function (sum) {
        if (Number.isNaN(Number(sum))) {
            return sum;
        }
        const strSum = String(sum);
        const strSumLen = strSum.length;
        return '£' + strSum.split('').reverse().map((val, idx) => {
            let oneIdx = idx + 1;
            return ((oneIdx % 3 === 0) && (oneIdx !== strSumLen)) ? `,${val}` : val;
        }).reverse().join('');
    }
};