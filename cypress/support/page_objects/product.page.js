class productPage {
	name() {
		return cy.get('[data-test="product-name"]');
	}

	addToCartButton() {
		return cy.get('[data-test="add-to-cart"]');
	}

	cartQuantity() {
		return cy.get('[data-test="cart-quantity"]');
	}
}

module.exports = new productPage();
