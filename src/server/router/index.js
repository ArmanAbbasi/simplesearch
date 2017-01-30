const api = require('../api/index');
const labels = require('../labels/index');

/**
 * Registering our routes
 * */
module.exports = (app) => {
    app.get('/search', (req,res) => {
        res.render('search.hbs', {
            title: labels.getLabelByKey('searchByPostCode'),
            resultsTitle: labels.getLabelByKey('searchForHousesAcrossUk'),
            labels: labels.getAllLabels()
        });
    });

    app.get('/results', (req,res) => {
        let data = (typeof req.query.p !== 'string' || !req.query.p) ? {} : api.searchByPostCode(req.query.p);

        if (!Object.keys(data).length) {
            res.render('search.hbs', {
                title: labels.getLabelByKey('enterAnotherLocation'),
                resultsTitle: labels.getLabelByKey('noResultsFound'),
                resultsSubTitle: labels.getLabelByKey('enterAnotherLocationAndSearch'),
                labels: labels.getAllLabels()
            });
        } else {
            res.render('results.hbs', {
                title: labels.getLabelByKey('searchResults'),
                data: data,
                labels: labels.getAllLabels()
            });
        }
    });
};