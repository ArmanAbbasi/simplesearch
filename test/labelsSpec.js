const path = require('path');
const fs = require('fs');
const labels = require(path.resolve('.') + '/src/server/labels');
const content = fs.readFileSync(path.resolve('.') + '/src/server/stubs/labels.json');
const jsonData = JSON.parse(content);


describe('Labels', () => {
    it('export returns object', () => {
        expect(typeof labels).toEqual('object');
    });

    it('has the all the functions present', () => {
        expect(typeof labels.getLabelByKey).toEqual('function');
        expect(typeof labels.getAllLabels).toEqual('function');
    });

    it('returns all labels when calling getAllLabels', () => {
        expect(labels.getAllLabels()).toEqual(jsonData);
    });

    it('returns specific labels when calling getLabelByKey with key', () => {
        expect(labels.getLabelByKey('postCode')).toEqual(jsonData['postCode']);
    });

    it('returns empty string when label not present', () => {
        expect(labels.getLabelByKey('unknow')).toEqual('');
    });
});