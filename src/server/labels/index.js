const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.resolve('.') + '/src/server/stubs/labels.json');
const jsonData = JSON.parse(content);

/**
 * A helper to get our labels
 * */
module.exports = {
    /**
     * @function
     * @name getLabelByKey
     * @param {String} key Id of key we're looking for
     * @returns {String} The value for the key
     * @description Given a key, searches for the corresponding value
     * */
    getLabelByKey: (key) => {
        return jsonData[key] || '';
    },
    /**
     * @function
     * @name getAllLabels
     * @returns {Object} The labels JSON
     * @description Gets all the labels we have
     * */
    getAllLabels: () => {
        return jsonData;
    }
};