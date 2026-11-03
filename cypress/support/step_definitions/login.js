import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../page_objects/login.page';

Given('I am on the login page', () => {
	cy.visit('/');
	loginPage.signInLink().click();
	loginPage.submitButton().should('be.visible');
});

When('I log in with email {string} and password {string}', (email, password) => {
	loginPage.emailInput().type(email);
	loginPage.passwordInput().type(password, { log: false });
	loginPage.submitButton().click();
});

Then('I am taken to the admin dashboard', () => {
	cy.url().should('include', '/admin/dashboard');
	loginPage.userMenu().should('be.visible');
});

Then('I see the login error {string}', (message) => {
	loginPage.errorMessage().should('have.text', message);
});

Then('I remain on the login page', () => {
	cy.url().should('include', '/auth/login');
});
