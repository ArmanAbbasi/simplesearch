const path = require('path');
const helpers = require(path.resolve('.') + '/src/server/helpers');

describe('Handlebars Helpers', () => {
    it('export returns object', () => {
        expect(typeof helpers).toEqual('object');
    });

    it('has the function formatCurrency', () => {
        expect(typeof helpers.formatCurrency).toEqual('function');
    });

    it('returns properly formatted currency', () => {
        const curr1 = helpers.formatCurrency('18000000');
        const curr2 = helpers.formatCurrency('100000');
        expect(curr1).toEqual('£18,000,000');
        expect(curr2).toEqual('£100,000');
    });

    it('returns same value if param is not a number', () => {
        const val = helpers.formatCurrency('some string');
        expect(val).toEqual('some string');
    });
});
