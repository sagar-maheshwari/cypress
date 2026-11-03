const constants = require('./constants');

// The test user created through the API for the current scenario (null when none exists)
const account = { current: null };

const buildUser = () => ({
	name: 'QA Tester',
	email: `qa_${Date.now()}_${Cypress._.random(1000, 9999)}@example.com`,
	password: 'Test@1234',
	title: 'Mr',
	birth_date: '10',
	birth_month: 'May',
	birth_year: '1990',
	firstname: 'QA',
	lastname: 'Tester',
	company: 'Glass Lewis',
	address1: '1 Test Street',
	address2: 'Suite 2',
	country: 'India',
	zipcode: '110001',
	state: 'Delhi',
	city: 'New Delhi',
	mobile_number: '9999999999',
});

// The API always answers HTTP 200 with the real status in the body, and as text/html, so the body is parsed here
const parse = (resp) => (typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body);

const create = (user = buildUser()) =>
	cy.request({ method: 'POST', url: `${constants.API_ROOT}/createAccount`, form: true, body: user }).then((resp) => {
		expect(parse(resp).responseCode, 'account created').to.eq(201);
		account.current = user;
	});

const remove = () => {
	if (!account.current) return;
	const { email, password } = account.current;
	cy.request({ method: 'DELETE', url: `${constants.API_ROOT}/deleteAccount`, form: true, body: { email, password } });
	account.current = null;
};

module.exports = { account, buildUser, parse, create, remove };
