// A module set for getting the status of the expected routes.
// Returns the status method produced by puppeteers goto() class, which can then be used to check the validity of a route through status codes eg: 200 for success, 404 for doesn't exist

const getStatus = async (page, route) => {
    const response = await page.goto(`${process.env.DOMAIN}/${route}`);
    return response.status();
}

exports.publisher = async (page, route) => await getStatus(page, `${process.env.CKAN_VERSION === "2.9" ? "organization" : "publisher"}/${route}`);
exports.harvest = async (page, route) => await getStatus(page, `harvest/${route}`);
exports.dataset = async (page, route) => await getStatus(page, `dataset/${route}`);
