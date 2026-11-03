const constants = require('./constants');

// Logs in through the API once per user and caches the session (token is kept in localStorage as "auth-token")
Cypress.Commands.add('loginWithAdmin', (email = constants.USER.admin) => {
	cy.session(
		email,
		() => {
			cy.request('POST', constants.API.LOGIN, { email, password: constants.PASSWORD }).then((resp) => {
				expect(resp.status).to.eq(200);
				window.localStorage.setItem('auth-token', resp.body.access_token);
			});
		},
		{
			validate: () => {
				cy.window().its('localStorage').invoke('getItem', 'auth-token').should('exist');
			},
		}
	);
});

Cypress.Commands.add('getAdminToken', () => {
	return cy
		.request('POST', constants.API.LOGIN, { email: constants.USER.admin, password: constants.PASSWORD })
		.then((resp) => resp.body.access_token);
});

Cypress.Commands.add('statusCode200', (alias) => {
	cy.wait(alias).its('response.statusCode').should('eq', 200);
});
