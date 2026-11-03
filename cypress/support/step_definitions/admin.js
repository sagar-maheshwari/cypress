import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import adminPage from '../page_objects/admin.page';

When('I navigate to the admin users page', () => {
	cy.visit('/admin/users');
});

Then('I see the users list', () => {
	adminPage.pageTitle().should('have.text', 'Users');
	adminPage.userRows().should('have.length.greaterThan', 0);
});

When('I search users for {string}', (term) => {
	cy.intercept('**/users/search**').as('USER_SEARCH');
	adminPage.userSearchInput().type(term);
	adminPage.userSearchSubmit().click();
	cy.statusCode200('@USER_SEARCH');
});

Then('I see a user row containing {string}', (text) => {
	adminPage.userRows().contains(text).should('be.visible');
});
