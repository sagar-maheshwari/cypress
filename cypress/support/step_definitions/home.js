import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import homePage from '../page_objects/home.page';
import constants from '../constants';

Given('I am on the home page', () => {
	// The site loads products with a non-GET method, so match any method
	cy.intercept(constants.API.PRODUCTS).as('PRODUCTS');
	cy.visit('/');
	cy.wait('@PRODUCTS').its('response.statusCode').should('eq', 200);
});

When('I search for {string}', (term) => {
	cy.intercept(`${constants.API.PRODUCTS}/search**`).as('PRODUCT_SEARCH');
	homePage.searchInput().type(term);
	homePage.searchSubmit().click();
	cy.statusCode200('@PRODUCT_SEARCH');
});

Then('I see a list of products', () => {
	homePage.productCards().first().should('be.visible');
	homePage.productNames().first().invoke('text').should('not.be.empty');
});

Then('every product name contains {string}', (term) => {
	homePage.productCards().should('have.length.greaterThan', 0);
	homePage.productNames().each(($name) => {
		expect($name.text().toLowerCase()).to.contain(term.toLowerCase());
	});
});

Then('I see no products', () => {
	homePage.productCards().should('not.exist');
});

When('I open the product {string}', (name) => {
	homePage.productCardByName(name).click();
});
