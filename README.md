## Introduction
This project is made with NodeJS, Express, Handlebars, SASS/SCSS, Jasmine, Babel, Gulp, Server side rendered (SSR), Gzip compression, Image compression, and JS/HTML/CSS minification. The search is created with a stubbed data and a fake API call. 

### Demo (Mobile view: iPhone 5)
![Mobile demo](demo/demo_mobile.gif)
- For a tablet and desktop demo, see: [demo folder](demo/).

## System requirements
- NodeJS installed (tested on v6.9.4)
- NPM installed (tested on 3.10.10)

## How to install and run the app
```bash
- git clone git@github.com:ArmanAbbasi/simplesearch.git # Clone the project
- cd simplesearch # cd to project folder
- npm install # Installs the dependencies
- npm run build # Build the assets
- npm run dev # Runs the server at http://localhost:3000/
- npm run test # Runs the tests
- npm run watch # Real time running of all tasks while you code (linting, sass/scss, es6/babel, images, test/tdd)
```

## How it works
- Navigate to http://localhost:3000/search, to see the search page. Navigating to any other paths, will result in a 'page not found'. See the routes.
- The search is created with a stubbed data and a fake API call. If you search for "N11", it will find results. Any other postcode will show the, 'No results found' page.