const express = require('express');
const path = require('path');
const request = require('supertest');
const app = express();
const expHbs = require('express-handlebars');

require(path.resolve('.') + '/src/server/router')(app);

app.set('views', path.resolve('.') + '/src/server/views');
app.engine('hbs', expHbs({
    extname:'hbs',
    helpers: require(path.resolve('.') + '/src/server/helpers'),
    partialsDir: [
        path.resolve('.') + '/src/server/views/partials'
    ]
}));
app.set('view engine', 'hbs');

describe('Router', () => {
    describe('GET /search', () => {
        it('/search returns page', (done) => {
            request(app)
                .get('/search')
                .end((request, response) => {
                    expect(response.res.statusCode).toEqual(200);
                    done();
                });
        });
    });

    describe('GET /results', () => {
        it('/results without param results /search page', (done) => {
            request(app)
                .get('/results')
                .end((request, response) => {
                    expect(response.res.statusCode).toEqual(200);
                    done();
                });
        });
    });

    describe('GET on unknown paths', () => {
        it('GET on unknown paths should show the err 404 page', (done) => {
            request(app)
                .get('/')
                .end((request, response) => {
                    expect(response.res.statusCode).toEqual(404);
                    done();
                });
        });
    });
});