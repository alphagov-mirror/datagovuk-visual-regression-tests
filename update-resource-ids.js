require('dotenv').config();
const puppeteer = require('puppeteer');
const updateEnv = require('./ckan-setup/utils/update-env');

(async () => {
  console.log('This command will update the .env resource id values to ids generated by your local ckan instance. Please make sure that a local instance of ckan is running and that you have either run the VRT setup, datagovuk test data setup or manually applied the test data.');

  // Start puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
      await updateEnv(page, process.argv[2] ? process.argv[2] : false);
  } catch(e) {
      // This and the browser.close() statement below, outside the try catch, ensure that the puppeteer session always ends. Otherwise the cli will hang until it times out, eating into machine memory
      await browser.close();
      console.log(e);
  }

  console.log('Resource ids updated successfully!');

  await browser.close();
})();