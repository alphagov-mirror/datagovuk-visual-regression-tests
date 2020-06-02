require('dotenv').config();
const puppeteer = require('puppeteer');
const login = require('../backstop_data/engine_scripts/puppeteer/utils/login');
const publisher = require('./publisher');

(async () => {
    console.log('Welcome to local data setup for datagovuk visual regression tests. Please ensure that you are running a local instance of docker-ckan and that your environment is clear. Failure to meet these requirements may lead to this script failing and your tests to fail unecessarily.');
    console.log('Preparing puppeteer...')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (process.argv.length < 3) {
        console.log('Error: You need to pass either "all" or a relevant keyword to this setup script so that it knows which setup scripts to run. Ending script...');
        await browser.close();
        return;
    }

    await login(page, {url: `${process.env.DOMAIN}`}, 'data setup');

    if (process.argv.indexOf('publisher') || process.argv.indexOf('all')) {
        await publisher(page);
    }

    await browser.close();
})();