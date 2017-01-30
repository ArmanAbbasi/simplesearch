const path = require('path');
const api = require(path.resolve('.') + '/src/server/api');
const fs = require('fs');
const content = fs.readFileSync(path.resolve('.') + '/src/server/stubs/data.json');
const jsonData = JSON.parse(content);

describe('API', () => {
    it('export returns object', () => {
        expect(typeof api).toEqual('object');
    });

    it('has the function searchByPostCode', () => {
        expect(typeof api.searchByPostCode).toEqual('function');
    });

    it('returns full results for postcode n11 or N11', () => {
        const resp1 = api.searchByPostCode('n11');
        const resp2 = api.searchByPostCode('N11');
        expect(resp1).toEqual(jsonData);
        expect(resp2).toEqual(jsonData);
    });

    it('returns empty results for any other postcode', () => {
        const resp = api.searchByPostCode('W2');
        expect(resp).toEqual({});
    });
});