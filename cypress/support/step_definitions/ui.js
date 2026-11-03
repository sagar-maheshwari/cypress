import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import constants from '../constants';
import { account } from '../account';
import authPage from '../page_objects/auth.page';
import productPage from '../page_objects/product.page';

Given('I am on the login page', () => {
	cy.visit('/login');
	authPage.loginButton().should('be.visible');
});

When('I log in with the registered user', () => {
	authPage.loginEmail().type(account.current.email);
	authPage.loginPassword().type(account.current.password, { log: false });
	authPage.loginButton().click();
});

When('I log in with email {string} and password {string}', (email, password) => {
	authPage.loginEmail().type(email);
	authPage.loginPassword().type(password, { log: false });
	authPage.loginButton().click();
});

When('I sign up with the registered user email', () => {
	authPage.signupName().type('Another Tester');
	authPage.signupEmail().type(account.current.email);
	authPage.signupButton().click();
});

Then('I am logged in with the registered user name', () => {
	authPage.loggedInAs().should('contain.text', account.current.name);
});

Then('I see the invalid login error', () => {
	cy.contains('p', constants.messages.invalidLogin).should('be.visible');
});

Then('I see the existing email error', () => {
	cy.contains('p', constants.messages.existingEmail).should('be.visible');
});

Given('I am on the products page', () => {
	cy.visit('/products');
	productPage.searchInput().should('be.visible');
});

When('I search for {string}', (term) => {
	productPage.searchInput().type(term);
	productPage.searchButton().click();
});

Then('I see the searched products heading', () => {
	productPage.searchedHeading().should('be.visible');
});

Then('every product shown is related to {string}', (term) => {
	productPage.productCards().should('have.length.greaterThan', 0);
	productPage.productCards().each(($card) => {
		expect($card.find('p').text().toLowerCase()).to.contain(term.toLowerCase());
	});
});

Given('I am on the details page of product {int}', (id) => {
	cy.visit(`/product_details/${id}`);
	productPage.addToCartButton().should('be.visible');
});

When('I add {int} of the product to the cart and open the cart', (quantity) => {
	productPage.quantityInput().clear().type(quantity);
	productPage.addToCartButton().click();
	productPage.viewCartLink().click();
});

Then('the cart shows a quantity of {int}', (quantity) => {
	cy.url().should('include', '/view_cart');
	productPage.cartQuantity().should('have.text', String(quantity));
});
