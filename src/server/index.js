const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const favicon = require('serve-favicon');
const compression = require('compression');
const staticAsset = require('static-asset');
const zLib = require('zlib');
const minIfyHTML = require('express-minify-html');

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = 3000;
const PAGE_NOT_FOUND_MSG = 'Requested page not found';

/**
 * Indicating our static folder and setting caching duration
 * */
app.use(staticAsset(path.resolve('.') + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(express.static(path.resolve('.') + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }) );

/**
 * Compression of HTML
 * */
app.use(minIfyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeComments: true,
        removeAttributeQuotes: true
    }
}));

/**
 * Setting the routes
 * */
require('./router/index')(app);

/**
 * Making it easier for our app to find the views
 * */
app.set('views',__dirname + '/views');

/**
 * Let's use Handlebars as template engine
 * */
app.engine('hbs', expHbs({
    extname:'hbs',
    helpers: require('./helpers/index'),
    partialsDir: [
        __dirname + '/views/partials'
    ]
}));
app.set('view engine', 'hbs');

/**
 * Gzip compression is a must
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));

/**
 * Page not found? :)
 * */
app.use((req, res) => {
    res.status(400);
    res.render('errors/404.hbs', {
        title: PAGE_NOT_FOUND_MSG
    });
});

/**
 * Page not found? :)
 * */
app.listen(APP_PORT_NUM, () => {
    console.log('Server running at: http://localhost:3000/');
});