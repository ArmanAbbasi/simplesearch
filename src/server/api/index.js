const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.resolve('.') + '/src/server/stubs/data.json');
const jsonData = JSON.parse(content);

/**
 * Normally we'd get this data from our database
 * */
module.exports = {
    /**
     * @function
     * @name searchByPostCode
     * @param {String} postCode The postcode to be searched for
     * @returns {Object} Data Object containing results
     * @description This is a fake call to find results for postcode containing 'n11'
     * */
    searchByPostCode: (postCode) => {
        postCode = postCode && postCode.toLowerCase();
        return postCode === 'n11' ? jsonData : {};
    }
};