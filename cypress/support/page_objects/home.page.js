class homePage {
	searchInput() {
		return cy.get('[data-test="search-query"]');
	}

	searchSubmit() {
		return cy.get('[data-test="search-submit"]');
	}

	productCards() {
		return cy.get('a.card');
	}

	productNames() {
		return cy.get('[data-test="product-name"]');
	}

	productCardByName(name) {
		return cy.contains('a.card', name);
	}
}

module.exports = new homePage();
