import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import constants from '../constants';
import { account, buildUser, parse } from '../account';

let body;

const send = (method, path, params) => {
	cy.request({
		method,
		url: `${constants.API_ROOT}${path}`,
		form: method === 'POST',
		qs: method === 'GET' ? params : undefined,
		body: method === 'POST' ? params : undefined,
		failOnStatusCode: false,
	}).then((resp) => {
		body = parse(resp);
	});
};

When('I send a GET request to {string}', (path) => {
	send('GET', path);
});

When('I send a POST request to {string}', (path) => {
	send('POST', path);
});

When('I send a POST request to {string} with {string} {string}', (path, name, value) => {
	send('POST', path, { [name]: value });
});

When('I create a new account through the API', () => {
	const user = buildUser();
	cy.request({ method: 'POST', url: `${constants.API_ROOT}/createAccount`, form: true, body: user }).then((resp) => {
		body = parse(resp);
		account.current = user;
	});
});

When('I verify the login of the registered user', () => {
	send('POST', '/verifyLogin', { email: account.current.email, password: account.current.password });
});

When('I verify the login with email {string} and password {string}', (email, password) => {
	send('POST', '/verifyLogin', { email, password });
});

When('I get the user details of the registered user', () => {
	send('GET', '/getUserDetailByEmail', { email: account.current.email });
});

Then('the API response code is {int}', (code) => {
	expect(body.responseCode).to.eq(code);
});

Then('the API response message is {string}', (message) => {
	expect(body.message).to.eq(message);
});

Then('the API response has a non-empty {string} list', (property) => {
	expect(body[property]).to.be.an('array').and.not.be.empty;
});

Then('every product in the API response has a name containing {string}', (term) => {
	body.products.forEach((product) => {
		expect(product.name.toLowerCase()).to.contain(term.toLowerCase());
	});
});

Then('the API user detail email matches the registered user', () => {
	expect(body.user.email).to.eq(account.current.email);
	expect(body.user.name).to.eq(account.current.name);
});
