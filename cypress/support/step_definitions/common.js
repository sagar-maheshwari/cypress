import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in as the admin user', () => {
	cy.loginWithAdmin();
});
