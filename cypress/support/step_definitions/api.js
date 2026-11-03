import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import constants from '../constants';

let response;
let token;
let firstProduct;

const authHeader = () => ({ Authorization: `Bearer ${token}` });

Given('I have an admin API token', () => {
	cy.getAdminToken().then((value) => {
		token = value;
	});
});

When('I send a POST request to {string} with email {string} and password {string}', (path, email, password) => {
	cy.request({
		method: 'POST',
		url: `${constants.API_ROOT}${path}`,
		body: { email, password },
		failOnStatusCode: false,
	}).then((resp) => {
		response = resp;
	});
});

When('I send a GET request to {string}', (path) => {
	cy.request({ url: `${constants.API_ROOT}${path}`, failOnStatusCode: false }).then((resp) => {
		response = resp;
	});
});

When('I send a GET request to {string} with the admin token', (path) => {
	cy.request({ url: `${constants.API_ROOT}${path}`, headers: authHeader(), failOnStatusCode: false }).then((resp) => {
		response = resp;
	});
});

When('I fetch the first product from the product list', () => {
	cy.request(constants.API.PRODUCTS).then((resp) => {
		firstProduct = resp.body.data[0];
	});
});

When('I send a GET request for that product', () => {
	cy.request({ url: `${constants.API.PRODUCTS}/${firstProduct.id}`, failOnStatusCode: false }).then((resp) => {
		response = resp;
	});
});

Then('the response status is {int}', (status) => {
	expect(response.status).to.eq(status);
});

Then('the response property {string} is {string}', (property, value) => {
	expect(String(response.body[property])).to.eq(value);
});

Then('the response has an access token', () => {
	expect(response.body.access_token, 'token is returned').to.be.a('string').and.not.be.empty;
});

Then('the response data is a non-empty list', () => {
	expect(response.body.data).to.be.an('array').and.not.be.empty;
});

Then('the response page number is {int}', (page) => {
	expect(response.body.current_page).to.eq(page);
});

Then('every product in the response has a name containing {string}', (term) => {
	response.body.data.forEach((product) => {
		expect(product.name.toLowerCase()).to.contain(term.toLowerCase());
	});
});

Then('the response matches that product', () => {
	expect(response.body.id).to.eq(firstProduct.id);
	expect(response.body.name).to.eq(firstProduct.name);
});
