import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productPage from '../page_objects/product.page';

Then('the product page shows {string}', (name) => {
	productPage.name().should('contain.text', name);
});

When('I add the product to the cart', () => {
	productPage.addToCartButton().click();
});

Then('the cart quantity is {string}', (quantity) => {
	productPage.cartQuantity().should('have.text', quantity);
});
