class productPage {
	searchInput() {
		return cy.get('#search_product');
	}

	searchButton() {
		return cy.get('#submit_search');
	}

	productCards() {
		return cy.get('.features_items .productinfo');
	}

	searchedHeading() {
		return cy.contains('.features_items h2.title', 'Searched Products');
	}

	quantityInput() {
		return cy.get('#quantity');
	}

	addToCartButton() {
		return cy.contains('button.cart', 'Add to cart');
	}

	viewCartLink() {
		return cy.get('#cartModal').contains('a', 'View Cart');
	}

	cartQuantity() {
		return cy.get('td.cart_quantity button');
	}
}

module.exports = new productPage();
